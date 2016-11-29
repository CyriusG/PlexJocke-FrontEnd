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
                    <button onClick={this.handleRequest.bind(this)} className="btn btn-delete error">
                        <span>Error</span>
                    </button>
                );
            }
            case STATE.LOADING: {
                return(
                    <button onClick={this.handleRequest.bind(this)} className="btn btn-delete loading">
                        <span>
                            <i class="fa fa-cog fa-spin"></i> Removing...
                        </span>
                    </button>
                );
            }
            case STATE.NOTHING: {
                return(
                    <button onClick={this.handleRequest.bind(this)} className="btn btn-delete idle">
                        <span>{content}</span>
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
            this.props.removeMovieRequest();
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