import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EntityCard from '../components/entity-components/entity-card'
class Search extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		var matchedEntities = {}

		for(var key in this.props.entities) {
			var entity = this.props.entities[key]
			var subject = entity.subject
			var query = this.props.match.params.query

			if(entity != null)
			{
				if(subject.toLowerCase().includes(query.toLowerCase()))
				{
					matchedEntities[key] = entity
				}
			}
		}

		return (
			<div>
				<div className="container">
					<div className="row">
						<h1 style={{textAlign:"center", marginTop:"15px"}} className="col-sm-12">Search Query: {this.props.match.params.query.toUpperCase()}</h1>
					</div>
				</div>
				
				<div style={{marginTop: '15px' }} className="row">
            	{
              		(this.props.entities) ? (
                		Object.keys(matchedEntities).map((key) => {
                  			return (
                    			<EntityCard key={key} entity={matchedEntities[key]} entityId={key} />
                  			)
                		})
              		) : (<div></div>)
            	}
          		</div>
      		</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		entities: state.entities
	}
}

export default connect(mapStateToProps, null)(Search)