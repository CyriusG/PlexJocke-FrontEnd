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
        this.bound_useronlyCheckboxChanged = this.useronlyCheckboxChanged.bind(this);
        this.bound_fetchingRequests = this.fetchingRequests.bind(this);
        this.bound_receivedRequests = this.receivedRequests.bind(this);
    }

    componentWillMount() {
        RequestStore.on("active_tab_changed", this.bound_activeTabChanged);
        RequestStore.on("useronly_checkbox_changed", this.bound_useronlyCheckboxChanged);
        RequestStore.on("fetching_requests", this.bound_fetchingRequests);
        RequestStore.on("received_requests", this.bound_receivedRequests);

        if(this.state.activeTab == "movies") {
            RequestActions.getMovieRequests(RequestStore.getUseronlyCheckbox());
        }
        else if(this.state.activeTab == "tv") {
            RequestActions.getShowRequests(RequestStore.getUseronlyCheckbox());
        }
    }

    componentWillUnmount () {
        RequestStore.removeListener("active_tab_changed", this.bound_activeTabChanged);
        RequestStore.removeListener("useronly_checkbox_changed", this.bound_useronlyCheckboxChanged);
        RequestStore.removeListener("fetching_requests", this.bound_fetchingRequests);
        RequestStore.removeListener("received_requests", this.bound_receivedRequests);
    }

    activeTabChanged() {
        this.setState({
            activeTab: RequestStore.getActiveTab()
        });
    }

    useronlyCheckboxChanged() {
        if(this.state.activeTab == "movies") {
            RequestActions.getMovieRequests(RequestStore.getUseronlyCheckbox());
        }
        else if(this.state.activeTab == "tv") {
            RequestActions.getShowRequests(RequestStore.getUseronlyCheckbox());
        }
    }

    fetchingRequests() {
        this.setState({
            requests: RequestStore.getRequests()
        });

        setTimeout(() => {
            this.setState({
                loading: true
            });
        }, 300);
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
                RequestActions.getMovieRequests(RequestStore.getUseronlyCheckbox());
            }
            else if(tab == "tv") {
                RequestActions.getShowRequests(RequestStore.getUseronlyCheckbox());
            }
        }
    }

    useronlyFilter(checkbox) {
        RequestStore.setUseronlyCheckbox(checkbox.target.checked);
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
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div class="checkbox pull-left">
                            <label>
                                <input type="checkbox" onChange={this.useronlyFilter.bind(this)} /> Show only my requests.
                            </label>
                        </div>
                    </div>
                </div>
                {loading ? <div className="loader-wrapper"><div className="loader"></div></div> : null}
                <Requests requests={requests} activeTab={activeTab}/>
            </div>
        );
    }
}