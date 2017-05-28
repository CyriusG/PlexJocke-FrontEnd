import React from "react";
import dispatcher from "../../../dispatcher";

import axios from "axios";

import ShowButton, {STATE} from "./ShowButton";

export default class Show extends React.Component {
    constructor() {
        super();

        this.state = {
            buttonState: STATE.NOTHING
        };
    }

    requestShow(seasons) {
        this.setState({
            buttonState: STATE.LOADING
        });

        const { id, title, tvdb_id, date, poster } = this.props;

        axios.get("https://api.tvmaze.com/shows/" + id + "/seasons").then((response) => {

            let numSeasons;
            let requestedSeasons;

            if(response.data[response.data.length - 1].premiereDate == null) {
                numSeasons = response.data.length - 1;
            }
            else {
                numSeasons = response.data.length;
            }

            if(seasons == -1) {
                requestedSeasons = seasons;
            }
            else if(seasons == -2) {
                requestedSeasons = "" + numSeasons;
            }

            axios.post(API_URL + "/show/create/", {
                title,
                seasons: requestedSeasons,
                release_date: date,
                tvdb_id,
                poster
            }, {
                withCredentials: true
            }).then((response) => {
                this.setState({
                    buttonState: STATE.SUCCESS
                });

                dispatcher.dispatch({
                    type: "REQUEST_SHOW_SUCCESS"
                })
            }).catch((error) => {
                this.setState({
                    buttonState: STATE.ERROR
                });

                dispatcher.dispatch({
                    type: "REQUEST_SHOW_ERROR",
                    data: error.response.data.message
                })
            });
        }).catch((error) => {
            this.setState({
                buttonState: STATE.ERROR
            });
        });
    }

    render() {
        const { date, id, overview, poster, title } = this.props;

        let year;

        if(date != null) {
            year = "(" + parseInt(date) + ")";
        } else {
            year = "";
        }

        return (
            <div className="row">
                <div className="searchResult">
                    <div className="col-md-3 col-sm-4">
                        <img className="searchResult-poster" src={poster}/>
                    </div>
                    <div className="col-md-9 col-sm-8">
                        <h2>{title} {year}</h2>
                        <p>{overview}</p>
                        <ShowButton key={id} state={this.state.buttonState} requestShow={this.requestShow.bind(this)} toggleSeasonsModal={this.props.toggleSeasonsModal}>
                            Request
                        </ShowButton>
                    </div>
                </div>
            </div>
        );
    }
}
