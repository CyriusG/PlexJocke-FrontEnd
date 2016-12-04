import React from "react";

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
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
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
                        <span>Error</span>
                    </button>
                );
            }
            case STATE.LOADING: {
                return(
                    <button className="btn btn-request loading pull-right">
                        <span>
                            <i class="fa fa-cog fa-spin"></i> Requesting...
                        </span>
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
                        <span>Success</span>
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

    requestAllSeasons() {
        this.props.requestShow("CyriusG", "joacim@cyriusg.se", "-1");
    }

    requestLatestSeason() {
        this.props.requestShow("CyriusG", "joacim@cyriusg.se", "-2");
    }

    handleRequest(e) {
        if(this.state.currentState === STATE.ERROR || this.state.currentState === STATE.LOADING || this.state.currentState === STATE.SUCCESS){
            e.preventDefault();
        }
        else {
            this.props.requestShow("CyriusG", "joacim@cyriusg.se");
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