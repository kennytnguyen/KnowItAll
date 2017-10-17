import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { upVote, downVote } from '../../firebase'

const UpVote = (isLoggedIn, numUpVote, id) => {
	if(isLoggedIn)
	{
		return <span className="badge badge-success badge-vote" onClick={() => upVote(id)}> <span className="glyphicon glyphicon-chevron-up">^</span> {numUpVote}</span>
	}
	else
	{
		return <span className="badge badge-success badge-vote"> <span className="glyphicon glyphicon-chevron-up">^</span> {numUpVote}</span>
	}
}

const DownVote = (isLoggedIn, numDownVote, id) => {
	if(isLoggedIn)
	{
		return <span className="badge badge-danger badge-vote" onClick={() => downVote(id) }> <span className="glyphicon glyphicon-chevron-down">v</span> {numDownVote}</span>
	}
	else
	{
		return <span className="badge badge-danger badge-vote"> <span className="glyphicon glyphicon-chevron-down">v</span> {numDownVote}</span>
	}
}

export default class EntityCard extends Component {
	constructor(props) {
		super(props)

		this.state = {
			entity: null
		}
	}

	render() {
		var subject = this.props.entity.subject;
		var type = this.props.entity.entityType;
		var numUpVote = (this.props.entity.numUpVote) ? this.props.entity.numUpVote : 0;
		var numDownVote = this.props.entity.numDownVote ? this.props.entity.numDownVote : 0;
		var user = (this.props.entity.anonymous) ? 'Anonymous' : this.props.entity.owner;
		var numComments = (this.props.entity.comments) ? Object.keys(this.props.entity.comments).length : 0;
		var entityId = this.props.entityId;

		return (
			<div className="col-sm-12 col-md-6 col-lg-4">
	            <div className="panel panel-default panel-google-plus">
	                <div className="panel-google-plus-tags">
	                    <ul>
	                        <li>{this.props.entity.category}</li>
	                    </ul>
	                </div>
	                <div className="panel-heading">
						<h3><span className="badge badge-warning">{type}</span> by {user} {UpVote(this.props.isLoggedIn, numUpVote, entityId)} {DownVote(this.props.isLoggedIn, numDownVote, entityId)}</h3>
	                </div>
	                <div className="panel-body" style={{wordWrap:"break-all", overflow: "hidden", textOverflow: "ellipsis"}}>
	                    <h2>{subject}</h2>
	                </div>
	                <div className="panel-footer">
	                    <span style={{color: 'darkGrey'}}>{numComments} Comments</span>
						<Link to={`/entities/${entityId}`} className="btn btn-outline-info btn-sm">View Post</Link>
	                </div>
	            </div>
			</div>
		)
	}
}