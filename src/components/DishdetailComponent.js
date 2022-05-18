import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Modal, Button, ModalBody, ModalHeader, Label, Col, Row } from "reactstrap";
import {Link} from 'react-router-dom';
import {LocalForm, Control, Errors } from 'react-redux-form';

const required= (val)=> val && val.length;
const minLength= (len)=> (val)=> val && val.length>=len;
const maxLength= (len)=> (val)=> !val || val.length<=len;

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state= {
            isModalOpen: false
        }
        this.toggleModal= this.toggleModal.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values){
        this.toggleModal();
        // alert(JSON.stringify(values));
        this.props.addComment(this.props.dishId,values.rating,values.author,values.comment);
    }
    
    render(){
        return(
            <div>
                <Button size='sm' outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"> Submit Comment</span>
                </Button>
                <Modal  isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comments</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=> this.handleSubmit(values)}>
                            <Row className='form-group'>
                                <Label htmlFor="rating" md={4}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model='.rating' name="rating" id="rating" classname="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='author' md={4}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model='.author' id='author' name='author'
                                    placeholder='Your Name' className='form-control'
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }} />
                                    <Errors 
                                    className='text-danger'
                                    model='.author'
                                    show='touched'
                                    messages={{
                                        required: "Required ",
                                        minLength: "Must be greater than 2 characters ",
                                        maxLength: "Must be 15 characters or less"
                                    }} />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='comment' md={4}>Comment</Label>
                                <Col md={12}>
                                    <Control.text model='.comment' id='comment' name='comment'
                                    row='3' className='form-control' />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Button type='submit' value="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
            </ModalBody>
        </Modal>
        </div>
        );
    }
}

    function RenderComments(comments){
            return(
                <li className='list-item'>
                    <div className='row'>{comments.comment}</div>
                    <div className='row'>-- {comments.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</div>
                </li>
            );
    }
    function RenderDish({dish}){
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle><strong>{dish.name}</strong></CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    const DishDetail = (props) => {
        const comment= props.comments.map((comment)=>{
                return(
                    <div>
                        <ul key={comment.id} className='list-unstyled'>
                            {RenderComments(comment)}
                        </ul>
                    </div>
                );
            });
        return(
            <div class="container">
                <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/meu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name} </BreadcrumbItem>
                </Breadcrumb>
                </div>
                <div className="col-12">
					  <h3>{props.dish.name}</h3>
					  <hr />
				  </div>
                <div className='row'>
                    <RenderDish dish={props.dish} />
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        {comment}
                        <CommentForm dishId={props.dish.id} addComment={props.addComment}/>
                    </div>
                </div>
            </div>
        );
    }

export default DishDetail;