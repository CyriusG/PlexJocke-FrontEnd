import React from "react";
import { IndexLink, Link, LinkContainer } from "react-router";

export default class Header extends React.Component {
    constructor() {
        super();

        this.state = {
            collapsed: "collapse"
        }
    }

    toggleNavbar() {
        if(this.state.collapsed == "collapse") {
            this.setState({
                collapsed: ""
            });
        }
        else {
            this.setState({
                collapsed: "collapse"
            });
        }
    }

    render() {
        const { collapsed } = this.state;

        return (
            <nav className="navbar navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" onClick={this.toggleNavbar.bind(this)}>
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Plex<span className="navbar-brand-alt">Jocke</span></a>
                    </div>
                    <div className={"navbar-collapse " + collapsed} id="navbar">
                        <ul className="nav navbar-nav">
                            <li><IndexLink activeClassName="active" to="/">Search</IndexLink></li>
                            <li><Link activeClassName="active" to="/requests">Requests</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}