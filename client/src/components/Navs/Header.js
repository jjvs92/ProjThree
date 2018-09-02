import React, { Component } from 'react';
import {connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Payments from './Payments';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false: 
                return [
                <li key="5"><a href="/auth/google">Login With Google</a></li>,              
                // console.log('this.props.auth', this.props.auth)
                    
            ]
            default: 
                return [
                    <li key="4" style={{margin: '0 10px'}}>
                        Total: {this.props.amount}
                    </li>,
                    <li key="8"><a href='/api/logout'>Logout</a></li>,
                    
                    // console.log('this.props.auth', this.props.auth)
            ];
        }
    }

    renderAdminContent () {
        
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        //if 'this.props.auth' returns a user then we go 'to/surveys', otherwise we go to '/'
                        to={this.props.auth ? '/home' : '/' }                        
                        className="left brand-logo"
                    >
                        Art Gutter
                    </Link>
                    <ul className="right">
                        { this.renderContent() }
                    </ul>
                </div>    
            </nav>
        )
    }
}

// telling this component if we are logged in or not and what to show occordingly
function mapStateToProps({ auth }) {
    return { auth };
}


export default connect(mapStateToProps) (Header);