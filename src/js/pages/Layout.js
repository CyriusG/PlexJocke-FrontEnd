import React from "react";

import Header from "../components/Header";
import Notification from "../components/Notification";
import Footer from "../components/Footer";

export default class Index extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Notification />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}