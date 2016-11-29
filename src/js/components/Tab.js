import React from "react";

export default class SearchTab extends React.Component {
    changeTab(e) {
        this.props.changeTab(e.target.value);
    }

    render() {
        const { active } = this.props;

        let movieActive = "";
        let tvActive = "";

        if(active == "movies") {
            movieActive = " active";
            tvActive = "";
        }
        else if(active == "tv") {
            movieActive = "";
            tvActive = " active";
        }

        return(
            <div>
                <button className={"btn-searchTab" + movieActive} value="movies" onClick={this.changeTab.bind(this)}>
                    <i className="fa fa-film" /> Movies
                </button>
                <button className={"btn-searchTab" + tvActive} value="tv" onClick={this.changeTab.bind(this)}>
                    <i className="fa fa-television" /> TV Shows
                </button>
            </div>
        );
    }
}