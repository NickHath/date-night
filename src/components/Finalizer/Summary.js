import React, { Component } from 'react';
import Finalizer from './Finalizer';
import Share from '../../assets/Share.svg';
import IconBulb from '../../assets/Icon_White.svg';
import Google from '../../assets/Google.svg';
import { connect } from 'react-redux'

class Summary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: ''
        }
    }

    render() {
        console.log(this.props)

        let finalCard = this.props.finalDate.map((date) => {
            return <Finalizer date={date} />
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
                            <a href={this.state.url} className="google-text" target='_blank'>Map On Google Maps<img className="google-icon" src={Google} alt="Map on Google" width="40px" /></a>
                        </div>
                        <button className="edit-share-desktop">EDIT DATE</button>
                    </div>
                    <img className="logo-share-box" src={IconBulb} alt="Home Logo" height="50px" />
                </div>

            </main>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Summary);