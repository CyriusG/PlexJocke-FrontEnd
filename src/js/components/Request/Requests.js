import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import Movie from "./Movie";

export default class Requests extends React.Component {
    constructor() {
        super();

        this.state = {
            requests: []
        }
    }

    componentWillReceiveProps(nextprops) {
        if(this.state.requests != nextprops.requests) {
            this.setState({
                requests: nextprops.requests
            })
        }
    }

    render() {
        const { requests } = this.state;

        const requestComponents = requests.map((request) => {
            let image;

            if (request.poster != null) {
                image = "https://image.tmdb.org/t/p/w184" + request.poster;
            }
            else {
                image = "https://www.themoviedb.org/assets/1c4aa0e7695a4eebe9a4d2c34a93bf34/images/no-poster-w600_and_h900_bestv2-v2.png";
            }

            return <Movie key={request.id}
                          id={request.id}
                          title={request.title}
                          poster={image}
                          date={request.release_date}
                          available={request.available}
                          requestedBy={request.user}
                          requestedDate={request.created} />;
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