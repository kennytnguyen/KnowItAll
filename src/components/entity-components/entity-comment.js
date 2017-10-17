import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class EntityComment extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var user = (this.props.comment.anonymous) ? 'Anonymous' : this.props.comment.commentorEmail;
        var commentText = (this.props.comment.comment) ? this.props.comment.comment : ""
        return (
            <div className="row">
                <div className="card card-fill col-sm-12">
                    <div className="card-title"><strong>{user}:</strong></div>
                    <div className="card-text"><i className="fa fa-comment" aria-hidden="true" style={{color:"darkGrey"}}></i> {commentText}</div>
                </div>
            </div>
        )
    }
}