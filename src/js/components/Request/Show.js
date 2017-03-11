import React from "react";

import RemoveButton, {STATE} from "./RemoveButton";
import TimeAgo from 'timeago-react';

import * as RequestActions from "../../actions/RequestActions";

export default class Show extends React.Component {
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

        RequestActions.deleteShowRequest(id);
    }

    render() {
        const { title, poster, seasons, date, available, requestedBy } = this.props;

        let requestedDate = "2017-01-01";

        if(this.props["requestedDate"] != null) {
            requestedDate = this.props["requestedDate"];
        }

        let year;

        if(date != "") {
            year = "(" + parseInt(date) + ")";
        } else {
            year = "";
        }

        let availableIcon;
        let showButton

        if(available == true) {
            availableIcon = <i className="icon-ok" />;
            showButton = "";
        }
        else {
            availableIcon = <i className="icon-cancel" />;
            showButton =  <RemoveButton state={this.state.buttonState} removeRequest={this.removeRequest.bind(this)}>Remove</RemoveButton>;
        }

        let formatedSeasons;

        if(seasons == -1) {
            formatedSeasons = "All seasons";
        }
        else if(seasons == -2) {
            formatedSeasons = "Latest season";
        }
        else {
            formatedSeasons = seasons;
        }

        return (
            <div className="row">
                <div className="searchResult">
                    <div className="col-md-3 col-sm-2">
                        <img className="searchResult-poster" src={poster}/>
                    </div>
                    <div className="col-md-7 col-sm-8">
                        <h2>{title} {year}</h2>
                        <p>Season(s): {formatedSeasons}</p>
                        <p>Available: {availableIcon}</p>
                        <p>Requested by: {requestedBy}</p>
                        <p>Requested: <TimeAgo datetime={requestedDate}/></p>
                    </div>
                    <div className="col-md-2 col-sm-8">
                        {showButton}
                    </div>
                </div>
            </div>
        );
    }
}