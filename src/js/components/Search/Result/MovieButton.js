import React from "react";

export const STATE = {
    ERROR: 'error',
    LOADING: 'loading',
    NOTHING: 'idle',
    SUCCESS: 'success'
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
                        Error
                    </button>
                );
            }
            case STATE.LOADING: {
                return(
                    <button onClick={this.handleRequest.bind(this)} className="btn btn-request loading pull-right">
                        <i class="icon-cog animate-spin" /> Requesting...
                    </button>
                );
            }
            case STATE.NOTHING: {
                return(
                    <button onClick={this.handleRequest.bind(this)} className="btn btn-request idle pull-right">
                        {content}
                    </button>
                );
            }
            case STATE.SUCCESS: {
                return(
                    <button onClick={this.handleRequest.bind(this)} className="btn btn-request success pull-right">
                        Success
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
            this.props.requestMovie("CyriusG", "joacim@cyriusg.se");
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