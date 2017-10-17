import React, {Component} from 'react'
import {removeEntity} from '../firebase'
import AdminComment from './admin-components/admin-comment'

export default class AdminAccordion extends Component {
	constructor(props) {
		super(props)
	}

	deleteButtonClicked() {
		removeEntity(this.props.entityId)
	}

	render() {
		var entity = this.props.entity
		var comments = entity.comments

		return (<div id="accordion">
            <div className="card">
              <div className="card-header">
                <h5 style={{padding:"0", margin:"0"}} className="col-sm-12">
                	<div style={{padding:"0"}}className="col-sm-12">
	                  <a style={{display:"inline", textDecoration:"none"}} className="collapsed" data-toggle="collapse" href={`#${this.props.entityId}`}>
	                    {this.props.entity.subject}
	                  </a>
	                  <i onClick={this.deleteButtonClicked.bind(this)} style={{cursor:"pointer", display:"inline-block", color:"red", float:"right"}} className="fa fa-minus-circle"></i>
	             	</div>
                </h5>
              </div>
            <div id={this.props.entityId} className="collapse">
          <div className="col-sm-12">
          	{
          		(comments) ? (
					Object.keys(comments).map(function(key) {
						return <AdminComment className="col-sm-12" key={key} commentKey={key} comment={comments[key]} subject={entity.subject} />
					})
          		) : (
					<h5 style={{textAlign:"center", marginTop:"15px"}}>No Comments</h5>
          		)
          	}
          </div>
        </div>
    	</div>
  	</div>)
	}
}