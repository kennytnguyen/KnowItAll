import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class EntityCommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: null,
            anon: false
        }
    }

    commentChange(e) {
        this.setState({
            comment: e.target.value
        })
    }

    anonSwitch(e) {
        this.setState({
            anon: !this.state.anon
        })
    }

    submitComment(e) {
        e.preventDefault()
        this.props.createEntityComment(
            this.props.entity.entityType,
            this.props.entityId,
            this.state.comment,
            this.props.user.uid,
            this.props.user.email,
            this.state.anon
        )
    }

    render() {
        const disable = (this.props.user !== null) ? false : true
        return (
            <div className="container-fluid">
              <div style={{margin: "0 auto"}}>
              </div>
              <textarea disabled={disable} onChange={ (e)=> {this.commentChange(e)}} name="review" className="form-control col-sm-12" rows="3" id="reviews" name="review"></textarea>
              <label><input disabled={disable} onClick={(e)=>{this.anonSwitch(e)}} type="checkbox" value={this.state.anon} /> Anonymous</label>
              <br/>
              <button disabled={disable} style={{marginTop:"10px"}} onClick={ (e) => {this.submitComment(e)}} type="button" className="btn btn-primary">Comment</button>  
            </div>
        )
    }
}