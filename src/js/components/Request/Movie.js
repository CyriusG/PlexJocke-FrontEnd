import React from "react";
import dispatcher from "../../dispatcher";

import axios from "axios";

import MovieButton, {STATE} from "./MovieButton";

export default class Movie extends React.Component {
    constructor() {
        super();

        this.state = {
            buttonState: STATE.NOTHING
        };
    }

    removeMovieRequest() {
        this.setState({
            buttonState: STATE.LOADING
        });

        const { id } = this.props;

        axios.delete("http://localhost:8000/movie/" + id + "/delete/").then((response) => {
            dispatcher.dispatch({
                type: "REQUEST_DELETED_MOVIE"
            })
        }).catch((error) => {
            this.setState({
                buttonState: STATE.ERROR
            });
        });
    }

    render() {
        const { title, poster, date, available, requestedBy, requestedDate } = this.props;

        let year;

        if(date != "") {
            year = "(" + parseInt(date) + ")";
        } else {
            year = "";
        }

        let availableIcon;

        if(available == true) {
            availableIcon = <i className="fa fa-check" />;
        }
        else {
            availableIcon = <i className="fa fa-times" />;
        }

        return (
            <div className="row">
                <div className="searchResult">
                    <div className="col-md-3 col-sm-2">
                        <img className="searchResult-poster" src={poster}/>
                    </div>
                    <div className="col-md-7 col-sm-8">
                        <h2>{title} {year}</h2>
                        <p>Release date: {date}</p>
                        <p>Available: {availableIcon}</p>
                        <p>Requested by: {requestedBy}</p>
                        <p>Requested date: {requestedDate}</p>
                    </div>
                    <div className="col-md-2 col-sm-8">
                        <MovieButton
                            state={this.state.buttonState}
                            removeMovieRequest={this.removeMovieRequest.bind(this)}>
                            Remove
                        </MovieButton>
                    </div>
                </div>
            </div>
        );
    }
}