import React from "react";

import Tab from "../components/Tab";
import Requests from "../components/Request/Requests";

import SearchStore from "../stores/SearchStore";

export default class Request extends React.Component {
    constructor() {
        super();
        this.state = {
            activeTab: SearchStore.getActiveTab(),
            requests: []
        };

        this.bound_activeTabChanged = this.activeTabChanged.bind(this);
    }

    componentWillMount() {
        SearchStore.on("active_tab_changed", this.bound_activeTabChanged);
    }

    componentWillUnmount () {
        SearchStore.removeListener("active_tab_changed", this.bound_activeTabChanged);
    }

    activeTabChanged() {
        this.setState({
            activeTab: SearchStore.getActiveTab()
        });
    }

    changeTab(tab, searchTerm) {
        if(this.state.activeTab != tab && tab != undefined) {
            SearchStore.setActiveTab(tab);
        }
    }

    render() {
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
                            <Tab active={this.state.activeTab} changeTab={this.changeTab.bind(this)} />
                        </div>
                    </div>
                </div>
                <Requests activeTab={this.state.activeTab} />
            </div>
        );
    }
}