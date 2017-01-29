import React from "react";
import dispatcher from "../../../dispatcher";

import axios from "axios";
import cookie from 'react-cookie';

import MovieButton, {STATE} from "./MovieButton";

export default class Movie extends React.Component {
    constructor() {
        super();

        this.state = {
            buttonState: STATE.NOTHING
        };
    }

    requestMovie() {
        this.setState({
           buttonState: STATE.LOADING
        });

        const { id } = this.props;

        let sessionid = cookie.load("sessionid");

        axios.get("https://api.themoviedb.org/3/movie/" + id + "?api_key=e744a86e0e96410625e426e00487adb9")
        .then((response) => {
            const { title, overview, release_date, imdb_id, poster_path } = response.data;

            axios.post("https://api.nit13.se/movie/create/", {
                title,
                overview,
                release_date,
                imdb_id,
                poster: poster_path,
                sessionid
            }).then((response) => {
                this.setState({
                    buttonState: STATE.SUCCESS
                });

                dispatcher.dispatch({
                    type: "REQUEST_MOVIE_SUCCESS"
                })
            }).catch((error) => {
                this.setState({
                    buttonState: STATE.ERROR
                });

                dispatcher.dispatch({
                    type: "REQUEST_MOVIE_ERROR",
                    data: error.response.data.message
                })
            });

        })
        .catch((error) => {
            this.setState({
                buttonState: STATE.ERROR
            });
        });
    }

    render() {
        const { date, id, overview, poster, title } = this.props;

        let year;

        if(date != "") {
            year = "(" + parseInt(date) + ")";
        } else {
            year = "";
        }

        return (
            <div className="row">
                <div className="searchResult">
                    <div className="col-md-3 col-sm-2">
                        <img className="searchResult-poster" src={poster}/>
                    </div>
                    <div className="col-md-9 col-sm-10">
                        <h2>{title} {year}</h2>
                        <p>{overview}</p>
                        <MovieButton key={id} state={this.state.buttonState} requestMovie={this.requestMovie.bind(this)}>
                            Request
                        </MovieButton>
                    </div>
                </div>
            </div>
        );
    }
}