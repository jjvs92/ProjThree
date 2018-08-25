import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../actions';
import API from "../utils/API";

import Header from './Navs/Header';
import Admin from '../pages/Admin'
import Home from '../pages/Home'
import Gallery from './Gallery/Gallery';

const App = () => (
    <div className="container">
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Home} />
                <Route exact path="/surveys" component={Home} />
                <Route exact path="/admin" component={Admin} />
                
                {/* <Route exact path="/gallery"  render={(routeProps) => (<Gallery clicked={this.clicked} />)} /> */}
            </div>
        </BrowserRouter>
    </div>
)

export default App;