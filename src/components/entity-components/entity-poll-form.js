import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class EntityPollForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            option: null,
            anon: false
        }
    }

    anonSwitch(e) {
        this.setState({
            anon: !this.state.anon
        })
    }

    submitPoll(e) {
        const userId = this.props.user.uid
        e.preventDefault();
        this.props.checkPollResponseExists(this.props.entityId, userId)
            .then( (snapshot) => {
                if (!snapshot.exists()) [
                    this.props.createPollResponse(
                        this.props.entityId,
                        this.state.option,
                        userId,
                        this.props.user.email,
                        this.state.anon
                    )
                ]
            })
    }

    optionClick(e, disable) {
        if(disable !== null) {
            this.setState({
                option: e.target.getAttribute("data-option")
            })
        }
    }

    render() {
        const options = this.props.entity.options ? this.props.entity.options : []
        const disable = (this.props.user !== null) ? false : true
        return (
            <div className="container-fluid">
                <ul className="list-group" style={{padding: "10px 5px 10px 5px"}}>
                    {
                        options.map((option, key) => {
                            return (
                                <li key={key} className="list-group-item" style={{backgroundColor: this.state.option === option ? '#ffb2b2' : 'white' }} onClick={ (e) => {this.optionClick(e, disable)}} data-option={option}>
                                    <div disabled={disable} className="radio" data-option={option}>
                                        <label data-option={option}>
                                            <input disabled={disable} data-option={option} type="radio" name="optionsRadios" checked={ this.state.option === option ? true : false }/>
                                            <span data-option={option} style={{display:"inline-block", marginLeft: "5px"}}> {option}</span>
                                        </label>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <label><input disabled={disable} onClick={(e) => {this.anonSwitch(e)}} type="checkbox" value={this.state.anon} /> Anonymous</label>
                <br/>
                <button disabled={disable} style={{marginTop:"10px"}} onClick={(e) => {this.submitPoll(e)}} type="button" className="btn btn-primary">Submit Poll Response</button>  
            </div>
        )
    }
}