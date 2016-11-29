import { EventEmitter} from "events";

import dispatcher from "../dispatcher";

class SearchStore extends EventEmitter {
    constructor() {
        super();

        this.error = false;
        this.message = "";
        this.loading = false;
        this.activeTab = "movies";
        this.searchResult = [];
    }

    clearSearch() {
        this.searchResult = [];
        this.emit("search_results_received");
    }

    getAll() {
        return this.searchResult;
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
                this.emit("request_movie_error");
                break;
            }
            case "REQUEST_MOVIE_SUCCESS": {
                this.message = "Movie was successfully requested."
                this.emit("request_movie_success");
                break;
            }
            case "REQUEST_DELETED_MOVIE": {
                this.emit("request_deleted_movie");
                break;
            }
        }
    }
}

const searchStore = new SearchStore;
dispatcher.register(searchStore.handleActions.bind(searchStore));

export default searchStore;