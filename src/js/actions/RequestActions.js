import dispatcher from "../dispatcher";

import axios from "axios";

export function clearSearch() {
    dispatcher.dispatch({
        type: "CLEAR_SEARCH_RESULTS"
    });
}

export function searchMovie(searchTerm) {
    dispatcher.dispatch({
        type: "FETCHING_SEARCH_RESULTS"
    });

    axios.get("https://api.themoviedb.org/3/search/movie?api_key=e744a86e0e96410625e426e00487adb9&query=" + searchTerm)
    .then((response) => {
        dispatcher.dispatch({
            type: "RECEIVED_SEARCH_RESULTS",
            data: response.data.results
        });
    }).catch((error) => {
        dispatcher.dispatch({
            type: "FETCHING_SEARCH_RESULTS_ERROR",
            error: error.response.data
        });
    });
}

export function searchTV(searchTerm) {
    dispatcher.dispatch({
        type: "FETCHING_SEARCH_RESULTS"
    });

    axios.get("https://api.tvmaze.com/search/shows?q=" + searchTerm).then((response) => {
            dispatcher.dispatch({
                type: "RECEIVED_SEARCH_RESULTS",
                data: response.data
            });
        }).catch((error) => {
        dispatcher.dispatch({
            type: "FETCHING_SEARCH_RESULTS_ERROR",
            error
        });
    });
}

export function getMovieRequests() {
    dispatcher.dispatch({
       type: "FETCHING_REQUESTS"
    });

    axios.get("https://api.nit13.se/movie/").then((response) => {
        dispatcher.dispatch({
            type: "RECEIVED_REQUESTS",
            data: response.data
        });
    }).catch((error) => {
        dispatcher.dispatch({
            type: "RECEIVED_REQUESTS",
            data: []
        })
    });
}

export function getShowRequests() {
    dispatcher.dispatch({
        type: "FETCHING_REQUESTS"
    });

    axios.get("https://api.nit13.se/show/").then((response) => {
        dispatcher.dispatch({
            type: "RECEIVED_REQUESTS",
            data: response.data
        });
    }).catch((error) => {
        dispatcher.dispatch({
            type: "RECEIVED_REQUESTS",
            data: []
        })
    });
}

export function deleteMovieRequest(id) {
    axios({
        method: "delete",
        url: "https://api.nit13.se/movie/" + id + "/delete/",
    }).then((response) => {
        axios.get("https://api.nit13.se/movie/").then((response) => {
            dispatcher.dispatch({
                type: "RECEIVED_REQUESTS",
                data: response.data
            });
        }).catch((error) => {
            dispatcher.dispatch({
                type: "RECEIVED_REQUESTS",
                data: []
            })
        });
    }).catch((error) => {});
}

export function deleteShowRequest(id) {
    axios({
        method: "delete",
        url: "https://api.nit13.se/show/" + id + "/delete/",
    }).then((response) => {
        axios.get("https://api.nit13.se/show/").then((response) => {
            dispatcher.dispatch({
                type: "RECEIVED_REQUESTS",
                data: response.data
            });
        }).catch((error) => {
            dispatcher.dispatch({
                type: "RECEIVED_REQUESTS",
                data: []
            })
        });
    }).catch((error) => {});
}