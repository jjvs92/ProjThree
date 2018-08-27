import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import API from "../utils/API";

import Header from './Navs/Header';
import Home from '../pages/Home';
import Gallery from './Gallery/Gallery';
import Modal from './submitModal';

const App = () => (
    <div className="container">
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Home} />
                <Route exact path="/surveys" component={Home} />
                {/* <Route exact path="/gallery"  render={(routeProps) => (<Gallery clicked={this.clicked} />)} /> */}
            </div>
        </BrowserRouter>
        <Modal />
    </div>
)

export default App;