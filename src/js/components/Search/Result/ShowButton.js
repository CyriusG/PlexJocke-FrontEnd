import React from "react";
import ReactDOM from 'react-dom';

export const STATE = {
    ERROR: 'error',
    LOADING: 'loading',
    NOTHING: 'idle',
    SUCCESS: 'success'
};

export default class ShowButton extends React.Component {
    constructor() {
        super();

        this.state = {
            currentState: STATE.NOTHING,
            dropdown: "",
        };
    }

    componentWillMount() {
        this.timer = null;
        document.addEventListener('click', this.handleClick, false);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        document.removeEventListener('click', this.handleClick, false);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.state === this.props.state) { return; }
        else {
            switch(nextProps.state) {
                case STATE.ERROR:
                    this.error();
                    return;
                case STATE.LOADING:
                    this.loading();
                    return;
                case STATE.NOTHING:
                    this.notLoading();
                    return;
                case STATE.SUCCESS:
                    this.success();
                    return;
            }
        }

    }

    genButton(state, content, id) {
        switch(state) {
            case STATE.ERROR: {
                return(
                    <button className="btn btn-request error pull-right">
                        Error
                    </button>
                );
            }
            case STATE.LOADING: {
                return(
                    <button className="btn btn-request loading pull-right">
                        <i class="icon-cog animate-spin" /> Requesting...
                    </button>
                );
            }
            case STATE.NOTHING: {
                return(
                    <div className="btn-group pull-right">
                        <button type="button" onClick={this.expandDropdown.bind(this)} className={"btn btn-request idle dropdown-toggle " + this.state.dropdown}>
                            Request <span className="caret" />
                        </button>
                        <ul className={"dropdown-menu " + this.state.dropdown}>
                            <li><a onClick={this.requestAllSeasons.bind(this)}>All Seasons</a></li>
                            <li><a onClick={this.requestLatestSeason.bind(this)}>Latest Season</a></li>
                        </ul>
                    </div>
                );
            }
            case STATE.SUCCESS: {
                return(
                    <button className="btn btn-request success pull-right">
                        Success
                    </button>
                );
            }
        }
    }

    expandDropdown() {
        if(this.state.dropdown == "") {
            this.setState({
                dropdown: "expanded",
            });
        }
        else {
            this.setState({
                dropdown: "",
            });
        }
    }

    handleClick = ((e) => {
        if(!ReactDOM.findDOMNode(this).contains(e.target)) {
            if(this.state.dropdown == "expanded") {
                this.setState({
                    dropdown: "",
                });
            }
        }
    });

    requestAllSeasons() {
        this.props.requestShow("-1");
    }

    requestLatestSeason() {
        this.props.requestShow("-2");
    }

    handleRequest(e) {
        if(this.state.currentState === STATE.ERROR || this.state.currentState === STATE.LOADING || this.state.currentState === STATE.SUCCESS){
            e.preventDefault();
        }
        else {
            this.props.requestShow();
        }
    }

    error() {
        this.setState({currentState: STATE.ERROR});
        this.timer = setTimeout(() => {
            this.notLoading();
        }, 3000);
    }

    loading() {
        this.setState({currentState: STATE.LOADING, dropdown: ""});
    }

    notLoading() {
        this.timer = setTimeout(() => {
            this.setState({currentState: STATE.NOTHING});
        }, 500);
    }

    success() {
        this.setState({currentState: STATE.SUCCESS});
        this.timer = setTimeout(() => {
            this.notLoading();
        }, 3000);
    }

    render() {
        const { children, id } = this.props;
        const { currentState } = this.state;
        const button = this.genButton(currentState, children, id);

        return(
            <div>
                {button}
            </div>
        );
    }
}