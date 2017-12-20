import React, { Component } from 'react'
import Logo from '../../assets/Logo_White.svg';
import FilterBtn from '../../assets/Settings.svg';
import ShuffleBtn from '../../assets/Shuffle.svg';
import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';
import {Link} from 'react-router-dom'
import { setTimeout } from 'timers';


export default class MobileHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    finalPage(){
        setTimeout( () =>{
            this.props.history.push("/results")
        }, 300)
        
    }

    render() {
        const actions = [
            <img
                primary={true}
                onClick={this.handleClose}
            />,
            <img
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];
        const styles = {
            block: {
                maxWidth: 300,
            },
            toggle: {
                marginTop: 30,
            },
            thumbSwitched: {
                backgroundColor: '#03a9f4',
            },
        };

        return (
            <div className='side-nav' >
                <center><img className="logo-side" src={Logo} alt="Home Logo" /></center>
                <div className="side-icons">
                    <div className="icons-box">
                        <img className="shuffle-btn" onClick = { () => {this.props.shuffle()}} src={ShuffleBtn} alt="Shuffle Button" height="80px" />
                        <p className="side-btn-text">SHUFFLE LIST</p>
                    </div>
                    <div className="icons-box">
                        <img onClick={this.handleOpen} className="filter-btn" src={FilterBtn} alt="Filter Button" height="80px" />
                        <Dialog
                            title="FILTER SETTINGS"
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                            style={{ backgroundColor: 'rgba(225, 225, 225, .75)' }}
                            titleStyle={{ fontSize: '36px', lineHeight: '40px', fontWeight: 'bold', fontFamily: 'Helvetica' }}
                        >
                            <div style={styles.block}>
                                <Toggle
                                    label="I'M ON A BUDGET"
                                    labelPosition="right"
                                    style={styles.toggle}
                                    thumbSwitchedStyle={styles.thumbSwitched}
                                />
                                <Toggle
                                    label="STONE COLD SOBER"
                                    labelPosition="right"
                                    style={styles.toggle}
                                    thumbSwitchedStyle={styles.thumbSwitched}
                                />
                                <Toggle
                                    label="DON'T MAKE ME EXERCISE"
                                    labelPosition="right"
                                    style={styles.toggle}
                                    thumbSwitchedStyle={styles.thumbSwitched}
                                />
                            </div>
                        </Dialog>
                        <p className="side-btn-text">FILTER</p>
                    </div>
                    <button className="save-button" onClick = { () => {this.props.finalizeDate(); this.finalPage()}} >SAVE MY DATE</button>
                </div>
            </div>
        );
    }
}