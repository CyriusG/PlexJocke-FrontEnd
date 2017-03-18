import React from "react";

import RequestStore from "../stores/RequestStore";
import * as RequestActions from "../actions/RequestActions";

import Result from "../components/Search/Result";
import Searchbar from "../components/Search/Searchbar";

export default class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            results: null,
            activeTab: RequestStore.getActiveTab()
        };

        this.bound_activeTabChanged = this.activeTabChanged.bind(this);
        this.bound_searchResultsFetching = this.searchResultsFetching.bind(this);
        this.bound_requestError = this.searchResultsFetchError.bind(this);
        this.bound_searchResultsReceived = this.searchResultsReceived.bind(this);
    }

    componentWillMount() {
        this.timer = null;

        RequestStore.on("active_tab_changed", this.bound_activeTabChanged);
        RequestStore.on("search_results_fetching", this.bound_searchResultsFetching);
        RequestStore.on("search_results_fetch_error", this.bound_requestError);
        RequestStore.on("search_results_received", this.bound_searchResultsReceived);

        const searchTerm = RequestStore.getSearchTerm();
        const activeTab = RequestStore.getActiveTab();

        if(searchTerm != "") {
            if(activeTab == "movies") {
                RequestActions.searchMovie(searchTerm);
            }
            else {
                RequestActions.searchTV(searchTerm);
            }
        }
    }

    componentWillUnmount () {
        clearTimeout(this.timer);

        RequestStore.removeListener("active_tab_changed", this.bound_activeTabChanged);
        RequestStore.removeListener("search_results_fetching", this.bound_searchResultsFetching);
        RequestStore.removeListener("search_results_fetch_error", this.bound_requestError);
        RequestStore.removeListener("search_results_received", this.bound_searchResultsReceived);
    }

    activeTabChanged() {
        this.setState({
            activeTab: RequestStore.getActiveTab()
        });
    }

    searchResultsFetching() {
        this.setState({
            loading: RequestStore.loading
        });
    }

    searchResultsFetchError() {
        this.setState({
            error: RequestStore.error,
            loading: RequestStore.loading
        });
    }

    searchResultsReceived() {
        this.setState({
            loading: RequestStore.loading
        });
    }

    changeTab(tab) {
        if(this.state.activeTab != tab && tab != undefined) {
            RequestStore.setActiveTab(tab);

            const searchTerm = RequestStore.getSearchTerm();

            if(searchTerm != "") {
                if (tab == "movies") {
                    RequestActions.searchMovie(searchTerm);
                }
                else if (tab == "tv") {
                    RequestActions.searchTV(searchTerm);
                }
            }
        }
    }

    searchMovie() {
        clearTimeout(this.timer);

        const searchTerm = RequestStore.getSearchTerm();

        if (searchTerm != "") {
            this.timer = setTimeout(() => {
                RequestActions.searchMovie(searchTerm);
            }, 500);
        }
        else {
            RequestActions.clearSearch();
        }
    }

    searchTV() {
        clearTimeout(this.timer);

        const searchTerm = RequestStore.getSearchTerm();

        if (searchTerm != "") {
            this.timer = setTimeout(() => {
                RequestActions.searchTV(searchTerm);
            }, 500);
        }
        else {
            RequestActions.clearSearch();
        }
    }

    render() {
        const { loading, activeTab, results } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>Search</h1>
                        <p>Want to watch something that's currently not on Plex? Search for it below and request it!</p>
                    </div>
                </div>
                <Searchbar
                    active={activeTab}
                    changeTab={this.changeTab.bind(this)}
                    searchMovie={this.searchMovie.bind(this)}
                    searchTV={this.searchTV.bind(this)}/>
                <Result loading={loading} activeTab={activeTab} results={results}/>
            </div>
        );
    }
}
