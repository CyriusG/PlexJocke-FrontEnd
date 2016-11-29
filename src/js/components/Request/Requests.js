import React from "react";

import axios from "axios";

import Movie from "./Movie";

export default class Requests extends React.Component {
    constructor() {
        super();

        this.state = {
            requests: []
        };
    }

    componentWillMount() {
        this.generateRequests(this.props.activeTab);
    }

    componentWillReceiveProps(nextProps) {
        this.generateRequests(nextProps.activeTab);
    }

    generateRequests(activeTab) {
        if(activeTab == "movies") {
            axios.get("http://localhost:8000/movie/").then((response) => {
                this.setState({
                    requests: response.data
                });
            }).catch((error) => {
                this.setState({
                    requests: []
                })
            });
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
                {requestComponents}
            </div>
        );
    }
}