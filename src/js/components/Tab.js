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
                    <i class="fa fa-film" aria-hidden="true"></i> Movies
                </button>
                <button className={"btn-searchTab" + tvActive} value="tv" onClick={this.changeTab.bind(this)}>
                    <i class="fa fa-television" aria-hidden="true"></i> TV Shows
                </button>
            </div>
        );
    }
}
