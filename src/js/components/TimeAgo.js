import React from "react";

export default class TimeAgo extends React.Component {

    timeAgo(time) {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        let timeArrayString = time.split("-");
        let timeArray = timeArrayString.map(Number);

        if(timeArray[2] == day && timeArray[1] == month && timeArray[0] == year) {
            return "today";
        }
        else if(timeArray[2] < day && timeArray[1] == month && timeArray[0] == year) {
            let daysAgo = day - timeArray[2];

            if(daysAgo >= 30) {
                return "a month ago";
            }
            else if(daysAgo == 1) {
                return "yesterday";
            }
            else {
                return daysAgo + " days ago";
            }
        }
        else if(timeArray[1] < month) {
            let monthsAgo = month - timeArray[1];

            if(monthsAgo >= 12) {
                return "a year ago";
            }
            else if(monthsAgo == 1) {
                return "last month";
            }
            else {
                return monthsAgo + " months ago";
            }
        }
        else {
            let yearsAgo = year - timeArray[0];

            if(yearsAgo == 1) {
                return "last year";
            }
            else {
                return yearsAgo + " years ago"
            }
        }
    }


    render() {

        const { time } = this.props;

        let timeAgo = this.timeAgo(time);

        return(
            <time datetime={time}>{timeAgo}</time>
        );
    }
}