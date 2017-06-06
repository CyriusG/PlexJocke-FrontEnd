import React from "react";

export const STATE = {
    ERROR: 'error',
    LOADING: 'loading',
    NOTHING: 'idle'
};

export default class MovieButton extends React.Component {
    constructor() {
        super();

        this.state = {
            currentState: STATE.NOTHING
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
            }
        }

    }

    genButton(state, content) {
        switch(state) {
            case STATE.ERROR: {
                return(
                    <button onClick={this.handleRequest.bind(this)} className="btn btn-delete error pull-right">
                        Error
                    </button>
                );
            }
            case STATE.LOADING: {
                return(
                    <button onClick={this.handleRequest.bind(this)} className="btn btn-delete loading pull-right">
                        <i class="fa fa-cog fa-spin" aria-hidden="true"></i> Removing...
                    </button>
                );
            }
            case STATE.NOTHING: {
                return(
                    <button onClick={this.handleRequest.bind(this)} className="btn btn-delete idle pull-right">
                        {content}
                    </button>
                );
            }
        }
    }

    handleRequest(e) {
        if(this.state.currentState === STATE.ERROR || this.state.currentState === STATE.LOADING){
            e.preventDefault();
        }
        else {
            this.props.removeRequest();
        }
    }

    error() {
        this.setState({currentState: STATE.ERROR});
        this.timer = setTimeout(() => {
            this.notLoading();
        }, 3000);
    }

    loading() {
        this.setState({currentState: STATE.LOADING});
    }

    notLoading() {
        this.setState({currentState: STATE.NOTHING});
    }

    render() {

        const { children } = this.props;

        const { currentState } = this.state;

        const button = this.genButton(currentState, children);

        return(
            <div>
                {button}
            </div>
        );
    }
}
