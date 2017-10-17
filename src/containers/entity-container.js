import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { 
	getEntity,
	upVote,
	downVote,
	entityResponse,
	createEntityReview, 
	checkReviewExists,
	createPollResponse,
	checkPollResponseExists,
	createEntityComment 
} from '../firebase'
import { dispatchGetEntity } from '../reducers/entity-reducer'
import EntityPollForm from '../components/entity-components/entity-poll-form'
import EntityReviewForm from '../components/entity-components/entity-review-form'
import EntityCommentForm from '../components/entity-components/entity-comment-form'
import EntityComment from '../components/entity-components/entity-comment'
import EntityReview from '../components/entity-components/entity-review'
import EntityPoll from '../components/entity-components/entity-poll'

const UpVote = (disabled, numUpVote, id) => {
	if(!disabled)
	{
		return <span className="badge badge-success badge-vote" onClick={() => upVote(id)}> <span className="glyphicon glyphicon-chevron-up">^</span> {numUpVote}</span>
	}
	else
	{
		return <span className="badge badge-success badge-vote"> <span className="glyphicon glyphicon-chevron-up">^</span> {numUpVote}</span>
	}
}

const DownVote = (disabled, numDownVote, id) => {
	if(!disabled)
	{
		return <span className="badge badge-danger badge-vote" onClick={() => downVote(id) }> <span className="glyphicon glyphicon-chevron-down">v</span> {numDownVote}</span>
	}
	else
	{
		return <span className="badge badge-danger badge-vote"> <span className="glyphicon glyphicon-chevron-down">v</span> {numDownVote}</span>
	}
}


class Entity extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		getEntity(this.props.dispatchGetEntity, this.props.match.params.id)
	} 
	render() {
		var numUpVote = (this.props.entity.numUpVote) ? this.props.entity.numUpVote : 0;
		var numDownVote = this.props.entity.numDownVote ? this.props.entity.numDownVote : 0;
		var entityId = this.props.match.params.id;
		var user = (this.props.entity.anonymous) ? 'Anonymous' : this.props.entity.owner;
		var comments = (this.props.entity.comments) ? this.props.entity.comments : {}
		var commentsKeys = (this.props.entity.comments) ? Object.keys(comments) : []
		var reviews = (this.props.entity.reviews) ? this.props.entity.reviews: {}
		var reviewsKeys = (this.props.entity.reviews) ? Object.keys(reviews) : []
		var polls = (this.props.entity.pollResponses) ? this.props.entity.pollResponses : {}
		var pollsKeys = (this.props.entity.pollResponses) ? Object.keys(polls) : []
		var details = (this.props.entity.details) ? this.props.entity.details : ""
		const disable = (this.props.user !== null) ? false : true

		return (
			<div className="fluid-container">
				<div className="card card-fill">
					<div className="card-header">
						<h4><span className="badge badge-warning">{this.props.entity.entityType}</span> by {user} {UpVote(disable, numUpVote, entityId)} {DownVote(disable, numDownVote, entityId)}</h4>
					</div>
					<div className="card-text row">
						<div className="col-sm-12 col-md-5">
							<h1>{this.props.entity.subject}</h1>
						</div>
						<div className="col-sm-12 col-md-7">
							<div className="card-title"><strong>Details: </strong> <span>{details}</span></div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-sm-12 col-md-5">
						<div className="card card-fill">
							<div className="card-header">
								<h4>Respond to {this.props.entity.entityType}</h4>
							</div>
							<div className="card-block">
								<div className="card-text">
									{
										(this.props.entity.entityType === 'Review') ? 
										<EntityReviewForm user={this.props.user} entity={this.props.entity} createEntityReview={createEntityReview} checkReviewExists={checkReviewExists} entityId={this.props.match.params.id} /> 
										: <EntityPollForm user={this.props.user} entity={this.props.entity} createPollResponse={createPollResponse} checkPollResponseExists={checkPollResponseExists} entityId={this.props.match.params.id} /> 
									}
								</div>
							</div>
						</div>

						<div className="card card-fill">
							<div className="card-header">
								<h4> Leave a Comment</h4>
							</div>
							<div className="card-block">
								<div className="card-text">
									<EntityCommentForm user={this.props.user} entity={this.props.entity} entityId={this.props.match.params.id} createEntityComment={createEntityComment}/>
								</div>
							</div>
						</div>
					</div>
					<div className="col-sm-12 col-md-7">
						<div className="card card-fill">
							
							<ul className="nav nav-tabs" role="tablist">
								<li className="nav-item">
									<a className="nav-link active" href="#responses" role="tab" data-toggle="tab" >{ (this.props.entity.entityType === 'Poll') ? 'Poll Responses' : 'Reviews' }</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#comments" role="tab" data-toggle="tab">Comments</a>
								</li>
							</ul>

							<div style={{padding: "5px 15px 5px 15px"}} className="tab-content">
								<div role="tabpanel" className="tab-pane fade in active show" id="responses">
									{
										(this.props.entity.entityType === 'Review') ? (
											reviewsKeys.map((reviewKey, key) => {
												return (
													<EntityReview review={reviews[reviewKey]} key={key} />
												)
											})
										) : (
											pollsKeys.map((pollKey, key) => {
												return (
													<EntityPoll poll={polls[pollKey]} key={key} />
												)
											})
										)
									}
								</div>
								<div role="tabpanel" className="tab-pane fade in" id="comments">
									{
										commentsKeys.map((commentKey, key) => {
											return (
												<EntityComment comment={comments[commentKey]} key={key} />
											)
										})
									}
								</div>
							</div>



						</div>
					</div>
				</div>

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		entity: state.entity,
		user: state.loginInfo
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators ( {
		dispatchGetEntity
	}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Entity)