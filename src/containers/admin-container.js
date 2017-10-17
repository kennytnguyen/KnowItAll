import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import {GetEntitiesFromFirebase} from '../reducers/entities-reducer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EntityCard from '../components/entity-components/entity-card'
import CreateEntityModal from '../components/create-entity-modal'
import { getEntities, addEntity } from '../firebase'
import { dispatchGetEntities } from '../reducers/entities-reducer'
import AdminAccordion from '../components/admin-accordion'

class Admin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  	return (
  		<div className="container-fluid">
      		<h1 style={{marginTop:'15px', textAlign: "center"}} className="col-sm-12">Admin Console</h1>
          {
            (this.props.entities) ? (
              Object.keys(this.props.entities).map((key) => {
                return (
                    <AdminAccordion key={key} entity={this.props.entities[key]} entityId={key} />
                    )
                  })
                ) : (
                  <div></div>
                )
            }
      </div>
  	)
  }
}

function mapStateToProps(state) {
  return {
    entities: state.entities
  }
}

export default connect(mapStateToProps, null)(Admin);