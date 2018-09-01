import React, { Component } from 'react';
import Finalizer from './Finalizer';
import Share from '../../assets/Share.svg';
import IconBulb from '../../assets/Icon_White.svg';
import Google from '../../assets/Google.svg';
import { connect } from 'react-redux'
import copy from 'copy-to-clipboard';
import {Link} from "react-router-dom";
import triangle from "../../assets/triangle.svg";
class Summary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: '',
            showSnack: false
        }
    }

    googleMapsUrl() {
        let baseUrl = 'https://www.google.com/maps/dir/';
        this.props.finalDate.map(date => {
          baseUrl = baseUrl + (date.coordinates.latitude + ',' +  date.coordinates.longitude + '/');
        });
        console.log(baseUrl);
        return baseUrl;
      }

    handleCopy() {
        copy(`http://dateideagenerator.com/results/${this.props.sharingId}`);
        this.setState({showSnack: true})
        setTimeout(function(){
            this.setState({showSnack: false})
        }.bind(this), 2000)
      }

    render() {
        let finalCard = this.props.finalDate.map((date) => {
            return <Finalizer date={date}/>
        })
        return (
            <main>
                <div className="final-summary">
                    {finalCard}
                </div>
                <div className="share-summary-box">
                    <p className="share-desktop">SHARE WITH YOUR SIGNIFICANT OTHER:</p>
                    <div className="input-desktop">
                        <input value={"dateideagenerator.com/results/" + this.props.sharingId} className="share-input-desktop" placeholder="copy URL" />
                        <img className="share-link" src={Share} alt="Share Icon" height="35px" onClick={() => this.handleCopy()} />
                        <div id={this.state.showSnack ? "snackBar" : "shnakeBar"} className="popup">Copied to clipboard!<img id="tri" src={triangle}/></div>
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