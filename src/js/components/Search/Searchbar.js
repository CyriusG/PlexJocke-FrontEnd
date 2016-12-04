import React from "react";
import ReactDOM from "react-dom";

import SearchTab from "../Tab";

import RequestStore from "../../stores/RequestStore";

export default class Searchbar extends React.Component {
    constructor() {
        super();
        this.state = {
            searchTerm: RequestStore.getSearchTerm()
        }
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.searchBar).focus();
    }

    changeTab(tab) {
        this.props.changeTab(tab, RequestStore.getSearchTerm());
    }

    handleChange(e) {
        const searchTerm = e.target.value;

        RequestStore.setSearchTerm(searchTerm);

        this.setState({
           searchTerm
        });

        if(this.props.active == "movies") {
            this.props.searchMovie();
        }
        else if(this.props.active == "tv") {
            this.props.searchTV();
        }
    }

    render() {
        const { loading } = this.props;

        const { searchTerm } = this.state;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="searchBar">
                        <SearchTab active={this.props.active} changeTab={this.changeTab.bind(this)} />
                        <input type="text" className="searchBarInput" ref="searchBar" defaultValue={searchTerm} onChange={this.handleChange.bind(this)} />
                        {loading ? <div className="loader-wrapper"><div className="loader-bar"></div></div> : null}
                    </div>
                </div>
            </div>
        );
    }
}