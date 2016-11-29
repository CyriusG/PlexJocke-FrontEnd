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
                    <button onClick={this.handleRequest.bind(this)} className="btn btn-request error pull-right">
                        <span>Error</span>
                    </button>
                );
            }
            case STATE.LOADING: {
                return(
                    <button onClick={this.handleRequest.bind(this)} className="btn btn-request loading pull-right">
                        <span>
                            <i class="fa fa-cog fa-spin"></i> Requesting...
                        </span>
                    </button>
                );
            }
            case STATE.NOTHING: {
                return(
                    <button onClick={this.handleRequest.bind(this)} className="btn btn-request idle pull-right">
                        <span>{content}</span>
                    </button>
                );
            }
            case STATE.SUCCESS: {
                return(
                    <button onClick={this.handleRequest.bind(this)} className="btn btn-request success pull-right">
                        <span>Success</span>
                    </button>
                );
            }
        }
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
        this.setState({currentState: STATE.LOADING});
    }

    notLoading() {
        this.timer = setTimeout(() => {
            this.setState({currentState: STATE.NOTHING});
        }, 500);
    }

    success() {
        this.setState({currentState: STATE.SUCCESS});
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