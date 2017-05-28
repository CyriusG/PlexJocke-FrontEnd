import React from "react";

export const STATE = {
    TOGGLED: true,
    NOTHING: false
};

export default class FilterButton extends React.Component {
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
            this.setState({
                currentState: nextProps.state
            });
        }

    }

    genButton(state, content) {
        switch(state) {
            case STATE.TOGGLED: {
                return(
                    <button onClick={this.toggleFilter.bind(this)} className="btn btn-filter toggled pull-right">
                        {content}
                    </button>
                );
            }
            case STATE.NOTHING: {
                return(
                    <button onClick={this.toggleFilter.bind(this)} className="btn btn-filter idle pull-right">
                        {content}
                    </button>
                );
            }
        }
    }

    toggleFilter(e) {
        e.preventDefault();
        this.props.useronlyFilter(); 
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

