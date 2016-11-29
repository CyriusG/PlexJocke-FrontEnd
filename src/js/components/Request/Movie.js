import React from "react";

export default class Movie extends React.Component {
    render() {
        const { title, poster, date, available, requestedBy, requestedDate } = this.props;

        let year;

        if(date != "") {
            year = "(" + parseInt(date) + ")";
        } else {
            year = "";
        }

        return (
            <div className="row">
                <div className="searchResult">
                    <div className="col-md-3 col-sm-2">
                        <img className="searchResult-poster" src={poster}/>
                    </div>
                    <div className="col-md-7 col-sm-8">
                        <h2>{title} {year}</h2>
                        <p>Release date: {date}</p>
                        <p>Available: {available}</p>
                        <p>Requested by: {requestedBy}</p>
                        <p>Requested date: {requestedDate}</p>
                    </div>
                    <div className="col-md-2 col-sm-8">
                        <button className="btn-delete">Remove</button>
                    </div>
                </div>
            </div>
        );
    }
}