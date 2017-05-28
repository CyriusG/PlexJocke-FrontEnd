import React from "react";

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
    
    generateModal(visible) {
        if(visible) {
            return(
                <div>
                    <div class="seasons-modal-backdrop"></div>
                    <div class="seasons-modal" tabIndex="-1" role="dialog">
                        <div class="seasons-modal-container">
                            <div class="seasons-modal-header">
                                <p class="pull-left">Seasons</p>
                                <p class="pull-right">Close</p>
                            </div>
                            <div class="seasons-modal-content">
                                <p>This is the content</p>
                            </div>
                        </div>
                    </div> 
                </div>
            );
        }
    }

    render() {

        const { visible } = this.state;

        let modal = this.generateModal(visible);

        return(
            <div>
                {modal}
            </div>
        );
    }

}
