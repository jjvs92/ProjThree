import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import API from "../../utils/API";

import Header from '../../components/Navs/Header';
import { Form, Input, FormBtn, FormGroup, Label } from "../../components/Form";
import {Row, Col} from "../../components/Grid"
import SideBar from "../../components/Sidebar/Sidebar";



class Admin extends Component {
    state = {
        user: {},
        stripe: '',
        borders: ['dotted',
            'dashed',
            'solid',
            'double',
            'groove',
            'ridge',
            'inset' ,
            'outset',
            'none',
            'hidden'],
        borderRadius: [10,20,30,40,50,60,70,80,90],
        borderColor: '',
        backgroundImage:'',
        textColor:'', 
        backGroundColor:'',
    }


    loadCurrentUser = () => {
        fetch("/api/current_user")
        .then(res => res.json())
        .then(
            (result) => {
                console.log('result', result)
            this.setState({
                isLoaded: true,
                user: result
            });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            this.setState({
                isLoaded: true,
                error
            });
            }
        )
    };

    componentDidMount() {
        console.log("COMPONENT MOUNTED")
        this.props.fetchUser();
        this.loadCurrentUser();     
        console.log("user", this.state.user)   

    }


    changeUserStatus = () => {
        console.log("STATEEEEEEEEE", this.state.user)
        const currentUser = this.state.user._id
        // const boolean = true
        API.changeUser(currentUser)
            .then(console.log("success"))
            .catch(err => console.log(err));
            window.location.reload();
            
    }

      //  Function to handle form input
      handleInputChange = event => {
        let { name, value } = event.target;
        console.log(value)
        this.setState({stripe : value})
        };

    // Function to handle form submit
    handleFormSubmit = event => {
  
        const currentUser = this.state.user._id     
        const stripeAccount = this.state.stripe
        console.log('stripeAccount', stripeAccount)  

        API.changetoAdmin(currentUser, stripeAccount)
        .then(console.log("success"))
        .catch(err => console.log(err));

    }

    render() {
        return (
            <div>
                <Header />  
                <Row>
                    <Col size="sm-2 offset-'sm-11">
                        <SideBar user={this.state.user}/>
                    </Col>
                </Row>              
                <div className="container">
                    <form>
                        <div className="form-group">
                            <label className="stripe" htmlFor="stripe">Stripe Account ID: </label>
                            <input value={this.state.stripe} onChange={this.handleInputChange} type="text" className="form-control titleInput" id="title" name="title"  placeholder="Please enter your stripe account ID generated by signing up with stripe above"/>
                        </div>
                    </form>
                    <button onClick={() => this.handleFormSubmit()}>Become an Admin</button>


                    <button><a href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_DW5XNKTvUAeODU0hK38cYryqiz6QGJFF&scope=read_write">Connect with Stripe</a></button>
                </div>
            </div>
        );
    };
};


export default connect(null, actions) (Admin);