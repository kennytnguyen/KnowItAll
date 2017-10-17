import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class EntityPoll extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var user = (this.props.poll.anonymous) ? 'Anonymous' : this.props.poll.posterEmail;
        var option = (this.props.poll.option) ? this.props.poll.option : ""
        return (
            <div className="row">
                <div className="card card-fill col-sm-12">
                    <div className="card-title"><strong>{user}</strong></div>
                    <div className="card-text"><i className="fa fa-dot-circle-o" aria-hidden="true" style={{color:"darkGrey"}}></i> {option}</div>
                </div>
            </div>
        )
    }
}