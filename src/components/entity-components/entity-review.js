import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class EntityReview extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var user = (this.props.review.anonymous) ? 'Anonymous' : this.props.review.reviewerEmail;
        var reviewText = (this.props.review.review) ? this.props.review.review : ""
        var numStars = (this.props.review.stars) ? parseInt(this.props.review.stars) : 0
        var stars = []
        for(var i = 0; i < 5; i++) {
            if(i < numStars) {
                stars.push(<i key={i} className="fa fa-star" style={{color:"#FD4"}} aria-hidden="true"></i>)
            } else {
                stars.push(<i key={i} className="fa fa-star-o" style={{color:"grey"}} aria-hidden="true"></i>)
            }
        }
        return (
            <div className="row">
                <div className="card card-fill col-sm-12">
                    <div className="card-title">
                        <strong>{user}</strong>
                        <span style={{float:"right"}} > 
                            {
                                stars.map((star, key) => {
                                    return star
                                })
                            }
                        </span>
                    </div>
                    <div className="card-text"><i className="fa fa-commenting-o" aria-hidden="true" style={{color:"darkGrey"}}></i> {reviewText} </div>
                </div>
            </div>
        )
    }
}