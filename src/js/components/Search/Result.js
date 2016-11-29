import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import Movie from "./Result/Movie";
import Show from "./Result/Show";

import SearchStore from "../../stores/RequestStore";

export default class Result extends React.Component {
    constructor() {
        super();

        this.state = {
            results: SearchStore.getAll()
        };

        this.bound_activeTabChanged = this.activeTabChanged.bind(this);
        this.bound_searchResultsReceived = this.searchResultsReceived.bind(this);
    }

    componentWillMount() {
        SearchStore.on("active_tab_changed", this.bound_activeTabChanged);
        SearchStore.on("search_results_received", this.bound_searchResultsReceived);
    }

    componentWillUnmount() {
        SearchStore.removeListener("active_tab_changed", this.bound_activeTabChanged);
        SearchStore.removeListener("search_results_received", this.bound_searchResultsReceived);
    }

    activeTabChanged() {
        this.setState({
            results: SearchStore.getAll()
        });
    }

    searchResultsReceived() {
        this.setState({
            results: SearchStore.getAll()
        });
    }

    render() {

        const { results } = this.state;
        const { activeTab } = this.props

        let resultComponents = null;

        if(activeTab == "movies") {
            resultComponents = results.map((result) => {

                let image;

                if(result.poster_path != null) {
                    image = "https://image.tmdb.org/t/p/w184" + result.poster_path;
                }
                else {
                    image = "https://www.themoviedb.org/assets/1c4aa0e7695a4eebe9a4d2c34a93bf34/images/no-poster-w600_and_h900_bestv2-v2.png";
                }

                return <Movie key={result.id}
                              id={result.id}
                              title={result.title}
                              overview={result.overview}
                              poster={image}
                              date={result.release_date}
                />;
            });
        }
        else if(activeTab == "tv") {
            resultComponents = results.map((result) => {

                let image;

                if(result.show.image != null) {
                    image = result.show.image.original;
                }
                else {
                    image = "https://www.themoviedb.org/assets/1c4aa0e7695a4eebe9a4d2c34a93bf34/images/no-poster-w600_and_h900_bestv2-v2.png";
                }

                return <Show key={result.show.id}
                              id={result.show.id}
                              title={result.show.name}
                              overview={result.show.summary.replace(/<\/?[^>]+(>|$)/g, "")}
                              poster={image}
                              date={result.show.premiered}
                />;
            });
        }


        return (
            <div>
                <ReactCSSTransitionGroup
                    transitionName="searchResult"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                    {resultComponents}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}