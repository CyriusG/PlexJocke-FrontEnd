import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import _ from 'underscore';

import Movie from "./Movie";
import Show from "./Show";

export default class Requests extends React.Component {
    constructor() {
        super();

        this.state = {
            requests: [],
            activeTab: ""
        }
    }

    componentWillMount() {
        this.setState({
            activeTab: this.props.activeTab
        });
    }

    componentWillReceiveProps(nextprops) {
        if(this.state.requests != nextprops.requests) {
            this.setState({
                requests: nextprops.requests,
                activeTab: nextprops.activeTab
            })
        }
    }

    render() {
        const { requests, activeTab } = this.state;

        var requestsSorted = _.sortBy(requests.reverse(), 'available');

        const requestComponents = requestsSorted.map((request) => {
            let image;

            if(activeTab == "movies") {

                if (request.poster != null) {
                    image = "https://image.tmdb.org/t/p/w184" + request.poster;
                }
                else {
                    image = "https://static.nit13.se/img/poster.png";
                }

                return <Movie key={request.id}
                              id={request.id}
                              title={request.title}
                              poster={image}
                              date={request.release_date}
                              available={request.available}
                              requestedBy={request.user}
                              requestedDate={request.created}/>;
            }
            else if(activeTab == "tv") {
                if (request.poster != null) {
                    image = request.poster;
                }
                else {
                    image = "https://static.nit13.se/img/poster.png";
                }

                return <Show key={request.id}
                             id={request.id}
                             title={request.title}
                             poster={image}
                             seasons={request.seasons}
                             date={request.release_date}
                             available={request.available}
                             requestedBy={request.user}
                             requestedDate={request.created}/>;
            }

        });

        return(
            <div>
                <ReactCSSTransitionGroup
                    transitionName="searchResult"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                    {requestComponents}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}