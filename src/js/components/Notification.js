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

        this.bound_requestError = this.requestError.bind(this);
        this.bound_requestSuccess = this.requestSuccess.bind(this);
        this.bound_deleteError = this.deleteError.bind(this);
    }

    componentWillMount() {
        SearchStore.on("request_error", this.bound_requestError);
        SearchStore.on("request_success", this.bound_requestSuccess);
        SearchStore.on("delete_error", this.bound_deleteError);
    }

    componentWillUnmount() {
        SearchStore.removeListener("request_error", this.bound_requestError);
        SearchStore.removeListener("request_success", this.bound_requestSuccess);
        SearchStore.removeListener("delete_error", this.bound_deleteError);
    }

    requestError() {
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

    requestSuccess() {
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

    deleteError() {
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