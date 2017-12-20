import React, { Component } from 'react';
import Finalizer from './Finalizer';
import Share from '../../assets/Share.svg';
import IconBulb from '../../assets/Icon_White.svg';
import {connect} from 'react-redux'

class Summary extends Component {
    constructor(props){
        super(props)
    }
    render() {
        console.log(this.props)

        let finalCard = this.props.finalDate.map( (date) => {
          return  <Finalizer  date = {date}/>
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
                    <button className="edit-share-desktop">EDIT DATE</button>
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