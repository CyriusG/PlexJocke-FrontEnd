import React from "react";

import MovieButton, {STATE} from "./RemoveButton";
import TimeAgo from 'timeago-react';

import * as RequestActions from "../../actions/RequestActions";

export default class Movie extends React.Component {
    constructor() {
        super();

        this.state = {
            buttonState: STATE.NOTHING
        };
    }

    removeRequest() {
        this.setState({
            buttonState: STATE.LOADING
        });

        const { id } = this.props;

        RequestActions.deleteMovieRequest(id);
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
        let movieButton;

        if(available == true) {
            availableIcon = <i className="icon-ok" />;
            movieButton = "";
        }
        else {
            availableIcon = <i className="icon-cancel" />;
            movieButton =  <MovieButton state={this.state.buttonState} removeRequest={this.removeRequest.bind(this)}>Remove</MovieButton>;
        }

        return (
            <div className="row">
                <div className="searchResult">
                    <div className="col-md-3 col-sm-2">
                        <img className="searchResult-poster" src={poster}/>
                    </div>
                    <div className="col-md-7 col-sm-8">
                        <h2>{title} {year}</h2>
                        <p>Available: {availableIcon}</p>
                        <p>Requested by: {requestedBy}</p>
                        <p>Requested: <TimeAgo datetime={requestedDate}/></p>
                    </div>
                    <div className="col-md-2 col-sm-8">
                        {movieButton}
                    </div>
                </div>
            </div>
        );
    }
}