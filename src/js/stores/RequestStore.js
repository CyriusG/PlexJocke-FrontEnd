import { EventEmitter} from "events";

import dispatcher from "../dispatcher";

class SearchStore extends EventEmitter {
    constructor() {
        super();

        this.error = false;
        this.message = "";
        this.loading = false;
        this.activeTab = "movies";
        this.useronlyCheckbox = false;
        this.searchTerm = "";
        this.searchResult = [];
        this.requests = [];
    }

    clearSearch() {
        this.searchResult = [];
        this.emit("search_results_received");
    }

    getSearchResult() {
        return this.searchResult;
    }

    getRequests() {
        return this.requests;
    }

    getMessage() {
        return this.message;
    }

    getActiveTab() {
        return this.activeTab;
    }

    setActiveTab(activeTab) {
        this.activeTab = activeTab;
        this.emit("active_tab_changed")
    }

    getUseronlyCheckbox() {
        return this.useronlyCheckbox;
    }

    setUseronlyCheckbox(value) {
        this.useronlyCheckbox = value;

        this.emit("useronly_checkbox_changed");
    }

    getSearchTerm() {
        return this.searchTerm;
    }

    setSearchTerm(searchTerm) {
        this.searchTerm = searchTerm;
    }

    handleActions(action) {
        switch(action.type) {
            case "CLEAR_SEARCH_RESULTS": {
                this.clearSearch();
                break;
            }
            case "FETCHING_SEARCH_RESULTS": {
                this.loading = true;
                this.clearSearch();
                this.emit("search_results_fetching");
                break;
            }
            case "FETCHING_SEARCH_RESULTS_ERROR": {
                this.error = true;
                this.loading = false;
                this.emit("search_results_fetch_error");
                break;
            }
            case "RECEIVED_SEARCH_RESULTS": {
                this.searchResult = action.data;
                this.loading = false;
                this.emit("search_results_received");
                break;
            }
            case "REQUEST_MOVIE_ERROR": {
                this.message = action.data;
                this.emit("request_error");
                break;
            }
            case "REQUEST_MOVIE_SUCCESS": {
                this.message = "Movie was successfully requested.";
                this.emit("request_success");
                break;
            }
            case "REQUEST_SHOW_ERROR": {
                this.message = action.data;
                this.emit("request_error");
                break;
            }
            case "REQUEST_SHOW_SUCCESS": {
                this.message = "Show was successfully requested.";
                this.emit("request_success");
                break;
            }
            case "FETCHING_REQUESTS": {
                this.loading = true;
                this.emit("fetching_requests");
                break;
            }
            case "RECEIVED_REQUESTS": {
                this.loading = false;
                this.requests = [];
                setTimeout(() => {
                    this.requests = action.data;
                    this.emit("received_requests");
                }, 300);
                break;
            }
            case "DELETE_REQUEST_ERROR": {
                this.loading = false;
                this.message = "Error deleting request.";
                this.emit("request_error");
            }
        }
    }
}

const searchStore = new SearchStore;
dispatcher.register(searchStore.handleActions.bind(searchStore));

export default searchStore;