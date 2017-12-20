import React, { Component } from 'react'

export default class HotCard extends Component {
    render() {
        return (
            <div className="hot-card">
                <img className="yelp-hotandnew" src={this.props.img} alt="New Place" />
            </div>
        )
    }
}
