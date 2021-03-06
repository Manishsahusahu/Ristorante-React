import React, { Component } from 'react';
import Menu from './MenuComponent';
import Head from './HeaderComponent';
import Foot from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import Home from './HomeComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { addComment } from '../redux/ActionCreators';

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment)=> dispatch(addComment(dishId, rating, author, comment))
});

const mapStateToProps=state=>{
    return{
        dishes: state.dishes,
        promotions: state.promotions,
        comments: state.comments,
        leaders: state.leaders
    };
};

class Main extends Component{
	constructor(props) {
        super(props);
      }
	render(){
        const HomePage= ()=>{
            return( 
                <Home 
                dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }
        const DishWithId = ({match}) =>{
            return(
                <DishDetail dish={this.props.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]}
                comments={this.props.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId,10))}
                addComment={this.props.addComment}
                />
            );
        } 
		return (
		  <div> 
            <Head/>
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes} />} />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route exact path='/contactus' component={Contact} />
                    <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                    <Redirect to="/home" />
                </Switch>
            <Foot/>
		  </div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
