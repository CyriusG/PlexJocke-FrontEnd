import React from "react";

import Tab from "../components/Tab";
import Requests from "../components/Request/Requests";

import RequestStore from "../stores/RequestStore";
import * as RequestActions from "../actions/RequestActions";

export default class Request extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            activeTab: RequestStore.getActiveTab(),
            requests: RequestStore.getRequests()
        };

        this.bound_activeTabChanged = this.activeTabChanged.bind(this);
        this.bound_fetchingRequests = this.fetchingRequests.bind(this);
        this.bound_receivedRequests = this.receivedRequests.bind(this);
    }

    componentWillMount() {
        RequestStore.on("active_tab_changed", this.bound_activeTabChanged);
        RequestStore.on("fetching_requests", this.bound_fetchingRequests);
        RequestStore.on("received_requests", this.bound_receivedRequests);

        if(this.state.activeTab == "movies") {
            RequestActions.getMovieRequests();
        }
        else if(this.state.activeTab == "tv") {
            RequestActions.getShowRequests();
        }
    }

    componentWillUnmount () {
        RequestStore.removeListener("active_tab_changed", this.bound_activeTabChanged);
        RequestStore.removeListener("fetching_requests", this.bound_fetchingRequests);
        RequestStore.removeListener("received_requests", this.bound_receivedRequests);
    }

    activeTabChanged() {
        this.setState({
            activeTab: RequestStore.getActiveTab()
        });
    }

    fetchingRequests() {
        this.setState({
            loading: true
        });
    }

    receivedRequests() {
        this.setState({
            requests: RequestStore.getRequests(),
            loading: false
        });
    }

    changeTab(tab) {
        if(this.state.activeTab != tab && tab != undefined) {
            RequestStore.setActiveTab(tab);

            if(tab == "movies") {
                RequestActions.getMovieRequests();
            }
            else if(tab == "tv") {
                RequestActions.getShowRequests();
            }
        }
    }

    render() {
        const { activeTab, requests, loading } = this.state;

        return(
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>Requests</h1>
                        <p>Below you can see everything that has been requested and their current status.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="searchBar">
                            <Tab active={activeTab} changeTab={this.changeTab.bind(this)} />
                            {loading ? <div className="loader-wrapper"><div className="loader-bar"></div></div> : null}
                        </div>
                    </div>
                </div>
                <Requests requests={requests} activeTab={activeTab}/>
            </div>
        );
    }
}