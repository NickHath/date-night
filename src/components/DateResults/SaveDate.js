import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';
import Share from '../../assets/Share.svg';

import copy from 'copy-to-clipboard';

class SaveDate extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleCopy() {
      copy(`http://localhost:3000/results/${this.props.sharingId}`);
    }

    render() {
        const actions = [
            <button
                primary={true}
                onClick={this.handleClose}
            />,
            <button
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];
        
        return (
            <div className="save-date-box">
                <button onClick={ () => { this.props.finalizeDate(); this.handleOpen() } } className="save-date">SAVE MY DATE</button>
                <Dialog
                    title="SHARE YOUR DATE"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    style={{backgroundColor: 'rgba(225, 225, 225, .75)'}}
                    titleStyle={{fontSize: '36px', lineHeight: '40px', fontWeight: 'bold', fontFamily:'Helvetica'}}
                    bodyStyle={{ backgroundColor: '#e57455'}}

                    >
                    <div className="input-box">
                        <input value={"http://localhost:3000/results/" + this.props.sharingId} className="share-input" placeholder="copy URL"  />
                        <img className="logo-bulb" src={Share} alt="Share Icon" height="35px" onClick={ () => this.handleCopy() }/>
                    </div>
                    <div className="white-line"></div>
                    <Link to={ `/results/${this.props.sharingId}` }><button className="edit-date">EDIT DATE</button></Link>
                    <a href={this.props.googleMaps} target='_blank'>To GoogleMaps</a>
                </Dialog>
            </div>
        )
    }
}

function mapStateToProps(state) {
  return { sharingId: state.sharingId, finalDate: state.finalDate, googleMaps: state.googleMaps };
}

export default connect(mapStateToProps)(SaveDate);
