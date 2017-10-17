import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class EntityReviewForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stars: 0,
            review: null,
            anon: false
        }
    }

    componentDidMount() {
        var thisEntityReview = this;
        $(function(){
            $('.starrr').on('starrr:change', function(e, value){
                ratingsField.val(value);
            });
        });
    }

    reviewChange(e) {
        this.setState({
            review: e.target.value
        })
    }

    changeStars(e) {
        this.setState({
            stars: parseInt(e.target.getAttribute("data-star"))
        });
    }

    anonSwitch(e) {
        this.setState({
            anon: !this.state.anon
        })
    }

    submitReview(e) {
        const userId = this.props.user.uid
        e.preventDefault()
        this.props.checkReviewExists(this.props.entityId, userId)
            .then((snapshot) => {
                if(!snapshot.exists()) {
                    this.props.createEntityReview(
                        this.props.entity.entityType,
                        this.props.entityId,
                        this.state.stars,
                        userId,
                        this.props.user.email,
                        this.state.review,
                        this.state.anon
                    )
                }
            })
    }

    render() {
        const disable = (this.props.user !== null) ? false : true
        return (
            <form id="reviewForm" className="container-fluid">
              <div style={{margin: "0 auto"}}>
              <div className="stars">
                  <input onClick={(e) => {this.changeStars(e)}} className="star star-5" id="star-5" type="radio" name="star" data-star="5" />
                  <label className="star star-5" htmlFor="star-5"></label>
                  <input onClick={(e) => {this.changeStars(e)}} className="star star-4" id="star-4" type="radio" name="star" data-star="4" />
                  <label className="star star-4" htmlFor="star-4"></label>
                  <input onClick={(e) => {this.changeStars(e)}} className="star star-3" id="star-3" type="radio" name="star" data-star="3"/>
                  <label className="star star-3" htmlFor="star-3"></label>
                  <input onClick={(e) => {this.changeStars(e)}} className="star star-2" id="star-2" type="radio" name="star" data-star="2"/>
                  <label className="star star-2" htmlFor="star-2"></label>
                  <input onClick={(e) => {this.changeStars(e)}} className="star star-1" id="star-1" type="radio" name="star" data-star="1"/>
                  <label className="star star-1" htmlFor="star-1"></label>
              </div>
              </div>
              <textarea disabled={disable} onChange={(e) => {this.reviewChange(e)}} name="review" className="form-control col-sm-12" rows="5" id="reviews" name="review"></textarea>
              <label><input disabled={disable} onClick={(e) => {this.anonSwitch(e)}} type="checkbox" value={this.state.anon} /> Anonymous</label>
              <br/>
              <button disabled={disable} style={{marginTop:"10px"}} onClick={(e) => {this.submitReview(e)}} type="button" className="btn btn-primary">Submit Review</button>  
            </form>
        )
    }
}