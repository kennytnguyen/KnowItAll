import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removeComment } from '../../firebase'

export default class ProfileComment extends Component {
    constructor(props) {
        super(props)
    }

    deleteButtonClicked() {
        removeComment(this.props.comment.entityId, this.props.commentKey)
    }
    render() {
        var commentText = (this.props.comment.comment) ? this.props.comment.comment : ""
        var user = (this.props.comment.anonymous) ? 'Anonymous' : this.props.comment.commentorEmail;
        return (
            <div style={{marginTop:"5px", marginBottom:"5px"}} className="row">
                <div style={{paddingRight:"20px"}}className="card card-fill col-sm-12">
                    <div className="card-title">
                        <i onClick={this.deleteButtonClicked.bind(this)} style={{cursor:"pointer", display:"inline-block", color:"red", float:"right"}} className="fa fa-minus-circle"></i>
                        <strong>{this.props.subject}:</strong>
                    </div>
                    <div className="card-text"><i className="fa fa-user" aria-hidden="true" style={{display:"inline-block", width:"1.25em", marginBottom:"15px", color:"darkGrey"}}></i> {user}</div>
                    <div className="card-text"><i className="fa fa-comment" aria-hidden="true" style={{display:"inline-block", width:"1.25em", color:"darkGrey"}}></i> {commentText}</div>
                </div>
            </div>
        )
    }
}