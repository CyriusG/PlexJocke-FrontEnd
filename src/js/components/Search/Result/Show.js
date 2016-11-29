import React from "react";

export default class Show extends React.Component {
    render() {
        const { date, id, overview, poster, title } = this.props;

        let year;

        if(date != null) {
            year = "(" + parseInt(date) + ")";
        } else {
            year = "";
        }

        return (
            <div className="row">
                <div className="searchResult">
                    <div className="col-md-3 col-sm-4">
                        <img className="searchResult-poster" src={poster}/>
                    </div>
                    <div className="col-md-9 col-sm-8">
                        <h2>{title} {year}</h2>
                        <p>{overview}</p>
                    </div>
                </div>
            </div>
        );
    }
}