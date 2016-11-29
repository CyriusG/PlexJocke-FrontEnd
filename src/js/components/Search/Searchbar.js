import React from "react";

import SearchTab from "../Tab";

export default class Searchbar extends React.Component {
    constructor() {
        super();
        this.state = {
            searchTerm: ""
        }
    }

    changeTab(tab) {
        this.props.changeTab(tab, this.state.searchTerm);
    }

    handleChange(e) {
        const searchTerm = e.target.value;

        this.setState({
            searchTerm
        });

        if(this.props.active == "movies") {
            this.props.searchMovie(searchTerm);
        }
        else if(this.props.active == "tv") {
            this.props.searchTV(searchTerm);
        }
    }

    render() {
        const { loading } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="searchBar">
                        <SearchTab active={this.props.active} changeTab={this.changeTab.bind(this)} />
                        <input type="text" className="searchBarInput" onChange={this.handleChange.bind(this)} />
                        {loading ? <div className="loader-wrapper"><div className="loader-bar"></div></div> : null}
                    </div>
                </div>
            </div>
        );
    }
}