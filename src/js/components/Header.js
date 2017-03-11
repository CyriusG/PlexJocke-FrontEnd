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
                        <a className="navbar-brand">Plex<span className="navbar-brand-alt">Jocke</span></a>
                    </div>
                    <div className={"navbar-collapse " + collapsed} id="navbar">
                        <ul className="nav navbar-nav">
                            <li><IndexLink activeClassName="active" to="/" onClick={this.toggleNavbar.bind(this)}>Search</IndexLink></li>
                            <li><Link activeClassName="active" to="/requests/" onClick={this.toggleNavbar.bind(this)}>Requests</Link></li>
                            <li><a target="_blank" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=E5AM3J7EEY5WL" onClick={this.toggleNavbar.bind(this)}><i className="icon-heart" /> Donate</a></li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right">
                            <li><a href="https://request.nit13.se/logout/">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}