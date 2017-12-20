import React, { Component } from 'react';
import Finalizer from './Finalizer';
import Share from '../../assets/Share.svg';
import IconBulb from '../../assets/Icon_White.svg';

export default class Summary extends Component {

    render() {
        return (
            <main>
                <div className="final-summary">
                    <Finalizer />
                    <Finalizer />
                    <Finalizer />
                </div>
                <div className="share-summary-box">
                    <p className="share-desktop">SHARE WITH YOUR SIGNIFICANT OTHER:</p>
                    <div className="input-desktop">
                        <input value={"http://localhost:3000/results/" + this.props.sharingId} className="share-input-desktop" placeholder="copy URL" />
                        <img className="share-link" src={Share} alt="Share Icon" height="35px" onClick={() => this.handleCopy()} />
                    </div>
                    <button className="edit-share-desktop">EDIT DATE</button>
                    <img className="logo-share-box" src={IconBulb} alt="Home Logo" height="50px" />

                </div>
                
            </main>
        );
    }
}
