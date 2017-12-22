import React, { Component } from 'react';
import Finalizer from './Finalizer';
import Share from '../../assets/Share.svg';
import IconBulb from '../../assets/Icon_White.svg';
import Google from '../../assets/Google.svg';
import { connect } from 'react-redux'
import copy from 'copy-to-clipboard';
import {Link} from "react-router-dom"
class Summary extends Component {
    handleCopy() {
        copy(`http://localhost:3000/results/${this.props.sharingId}`);
      }

    render() {
        console.log(this.props)
        let time = this.props.preferences.startTime;
        let finalCard = this.props.finalDate.map((date) => {
            return <Finalizer date={date} time={time}/>
            time += 200;
        })
        return (
            <main>
                <div className="final-summary">
                    {finalCard}
                </div>
                <div className="share-summary-box">
                    <p className="share-desktop">SHARE WITH YOUR SIGNIFICANT OTHER:</p>
                    <div className="input-desktop">
                        <input value={"http://localhost:3000/results/" + this.props.sharingId} className="share-input-desktop" placeholder="copy URL" />
                        <img className="share-link" src={Share} alt="Share Icon" height="35px" onClick={() => this.handleCopy()} />
                    </div>
                    <div className="btn-box-final">
                        <div className="google-box">
                            <a href={this.props.googleMaps} className="google-text" target='_blank'>Map On Google Maps<img className="google-icon" src={Google} alt="Map on Google" width="40px" /></a>
                        </div>
                       <Link to = {`/results/${this.props.sharingId}`} >
                        <button className="edit-share-desktop">EDIT DATE</button>
                        </Link>
                    </div>
                <Link to = "/">
                <img className="logo-share-box" src={IconBulb} alt="Home Logo" height="50px" />
                </Link>
                </div>

            </main>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Summary);