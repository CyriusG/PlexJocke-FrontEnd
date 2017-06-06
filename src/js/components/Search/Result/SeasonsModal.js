import React from "react";
import ClickOutHandler from 'react-onclickout';

export default class SeasonsModal extends React.Component {

    constructor() {
        super();

        this.state = {
            visible: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.visible != this.state.visible) {
            this.setState({
                visible: nextProps.visible
            });
        }
    }
    
    onClickOut(e) {
        this.props.toggle();
    }

    generateModal(visible) {
        if(visible) {
            return(
                <div>
                    <div class="seasons-modal-backdrop"></div>
                    <div class="seasons-modal" tabIndex="-1" role="dialog">
                        <ClickOutHandler onClickOut={this.onClickOut.bind(this)}>
                            <div class="seasons-modal-container">
                                <div class="seasons-modal-header">
                                    <p class="pull-left">Seasons</p>
                                    <a class="pull-right" onClick={this.props.toggle}><i class="fa fa-times" aria-hidden="true"></i></a>
                                </div>
                                <div class="seasons-modal-content">
                                    <form action="">
                                        <input type="checkbox" /> Season 1 <br />
                                        <input type="checkbox" /> Season 2 
                                    </form>
                                </div>
                            </div>
                        </ClickOutHandler>
                    </div> 
                </div>
            );
        }
    }

    render() {

        let { visible } = this.state;

        let modal = this.generateModal(visible);

        return(
            <div>
                {modal}
            </div>
        );
    }

}
