import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class EntityComment extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this)
        var commentText = (this.props.comment.comment) ? this.props.comment.comment : ""
        var user = (this.props.comment.anonymous) ? 'Anonymous' : this.props.comment.commentorEmail;
        return (
            <div className="row">
                <div className="card card-fill col-sm-12">
                    <div className="card-title"><strong>{this.props.subject}:</strong></div>
                    <div className="card-text"><i className="fa fa-user" aria-hidden="true" style={{display:"inline-block", width:"1.25em", marginBottom:"15px", color:"darkGrey"}}></i> {user}</div>
                    <div className="card-text"><i className="fa fa-comment" aria-hidden="true" style={{display:"inline-block", width:"1.25em", color:"darkGrey"}}></i> {commentText}</div>
                </div>
            </div>
        )
    }
}