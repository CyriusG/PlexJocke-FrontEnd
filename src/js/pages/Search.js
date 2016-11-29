import React from "react";

import SearchStore from "../stores/SearchStore";
import * as SearchActions from "../actions/SearchActions";

import Result from "../components/Search/Result";
import Searchbar from "../components/Search/Searchbar";

export default class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            results: null,
            activeTab: SearchStore.getActiveTab()
        };

        this.bound_activeTabChanged = this.activeTabChanged.bind(this);
        this.bound_searchResultsFetching = this.searchResultsFetching.bind(this);
        this.bound_searchResultsFetchError = this.searchResultsFetchError.bind(this);
        this.bound_searchResultsReceived = this.searchResultsReceived.bind(this);
    }

    componentWillMount() {
        this.timer = null;

        SearchStore.on("active_tab_changed", this.bound_activeTabChanged);
        SearchStore.on("search_results_fetching", this.bound_searchResultsFetching);
        SearchStore.on("search_results_fetch_error", this.bound_searchResultsFetchError);
        SearchStore.on("search_results_received", this.bound_searchResultsReceived);
    }

    componentWillUnmount () {
        clearTimeout(this.timer);

        SearchStore.removeListener("active_tab_changed", this.bound_activeTabChanged);
        SearchStore.removeListener("search_results_fetching", this.bound_searchResultsFetching);
        SearchStore.removeListener("search_results_fetch_error", this.bound_searchResultsFetchError);
        SearchStore.removeListener("search_results_received", this.bound_searchResultsReceived);
    }

    activeTabChanged() {
        this.setState({
            activeTab: SearchStore.getActiveTab()
        });
    }

    searchResultsFetching() {
        this.setState({
            loading: SearchStore.loading
        });
    }

    searchResultsFetchError() {
        this.setState({
            error: SearchStore.error,
            loading: SearchStore.loading
        });
    }

    searchResultsReceived() {
        this.setState({
            loading: SearchStore.loading
        });
    }

    changeTab(tab, searchTerm) {
        if(this.state.activeTab != tab && tab != undefined) {
            SearchStore.setActiveTab(tab);

            if(searchTerm != "") {
                if (tab == "movies") {
                    SearchActions.searchMovie(searchTerm);
                }
                else if (tab == "tv") {
                    SearchActions.searchTV(searchTerm);
                }
            }
        }
    }

    searchMovie(searchTerm) {
        clearTimeout(this.timer);

        if (searchTerm != "") {
            this.timer = setTimeout(() => {
                SearchActions.searchMovie(searchTerm);
            }, 500);
        }
        else {
            SearchActions.clearSearch();
        }
    }

    searchTV(searchTerm) {
        clearTimeout(this.timer);

        if (searchTerm != "") {
            this.timer = setTimeout(() => {
                SearchActions.searchTV(searchTerm);
            }, 500);
        }
        else {
            SearchActions.clearSearch();
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
                    loading={loading}
                    active={activeTab}
                    changeTab={this.changeTab.bind(this)}
                    searchMovie={this.searchMovie.bind(this)}
                    searchTV={this.searchTV.bind(this)}/>
                <Result activeTab={activeTab} results={results}/>
            </div>
        );
    }
}