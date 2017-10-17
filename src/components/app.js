import React, { Component } from 'react';
import Navbar from './navbar'
import { Switch, Route } from 'react-router-dom'
import Entities from '../containers/entities-container'
import { firebaseInit } from '../firebase'
import Login from '../containers/login-container'
import Entity from '../containers/entity-container'
import Profile from '../containers/profile-container'
import Search from '../containers/search-container'
import Admin from '../containers/admin-container'

export default class App extends Component {
  constructor(props) {
    super(props)
    firebaseInit()
  }

  render() {
    return (
    	<div>
        <Route path="/" component={Navbar} />
        <div className="container">
      		<Route exact path='/' render={()=>{return (
            <div>
              <Entities />
            </div>
          )}} />
    			<Route path='/login' component={Login} />	
          <Route path='/entities/:id' component={Entity} />
          <Route path='/profile' render={()=>{return(
            <Profile />
          )}}/> 
          <Route path='/search/:query' component={Search} /> 
          <Route path='/admin' component={Admin} /> 
        	</div>
        </div>
    );
  }
}


