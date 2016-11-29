import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import SearchStore from "../stores/RequestStore";

export default class Notification extends React.Component {
    constructor() {
        super();

        this.state = {
            visible: false,
            type: "",
            message: SearchStore.getMessage()
        };

        this.bound_searchResultsFetchError = this.searchResultsFetchError.bind(this);
        this.bound_searchResultsFetchSuccess = this.searchResultsFetchSuccess.bind(this);
    }

    componentWillMount() {
        SearchStore.on("request_movie_error", this.bound_searchResultsFetchError);
        SearchStore.on("request_movie_success", this.bound_searchResultsFetchSuccess);
    }

    componentWillUnmount() {
        SearchStore.removeListener("request_movie_error", this.bound_searchResultsFetchError);
        SearchStore.removeListener("request_movie_success", this.bound_searchResultsFetchSuccess);
    }

    searchResultsFetchError() {
        this.setState({
            visible: true,
            type: "notification-error",
            message: SearchStore.getMessage()
        });

        setTimeout(() => {
            this.setState({
                visible: false
            });
        }, 3000);
    }

    searchResultsFetchSuccess() {
        this.setState({
            visible: true,
            type: "notification-success",
            message: SearchStore.getMessage()
        });

        setTimeout(() => {
            this.setState({
               visible: false
            });
        }, 3000);
    }

    generateNotification() {
        const { visible, type, message } = this.state;

        if(visible == true) {
            return(
                <div className={"notification " + type}>
                    <div className="container">
                        <div className="col-xs-12">
                            <p>{message}</p>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return null;
        }
    }

    render() {
        const notification = this.generateNotification();

        return (
            <div>
                <ReactCSSTransitionGroup
                    transitionName="notification"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}>
                    {notification}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}