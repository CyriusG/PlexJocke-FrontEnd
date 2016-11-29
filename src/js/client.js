import React from "react";
import ReactDOM from "react-dom";
import { hashHistory, IndexRoute, Router, Route } from "react-router";

import Layout from "./pages/Layout";
import Requests from "./pages/Requests";
import Search from "./pages/Search";

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Search}/>
            <Route path="/requests" component={Requests} />
        </Route>
    </Router>,
app);