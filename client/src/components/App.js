import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "../pages/Home";
import NewArt from "../pages/NewArt";
import AdminForm from "../pages/AdminForm";
import Artists from "../pages/Artists";
import Artist from "../pages/Artist";
import Product from "../pages/Product";
import Customize from "../pages/Customize";
import Post from "../pages/Post";
import Delete from "../pages/Delete";
import Checkout from "../pages/Checkout";
import Footer from "../components/Footer/Footer";
import "./App.css";
import $ from "jquery";
import ContactUs from "../pages/ContactUs/ContactUs";

import Modal from "./submitModal";

const App = () => (
  <div>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/new" component={NewArt} />
        <Route exact path="/adminform" component={AdminForm} />
        <Route exact path="/artists" component={Artists} />
        <Route exact path="/artist/:id" component={Artist} />
        <Route exact path="/product/:id" component={Product} />
        <Route exact path="/customize" component={Customize} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/delete" component={Delete} />
        <Route exact path="/checkout/:id" component={Checkout} />
        <Route exact path="/contactus" component={ContactUs} />
      </div>
    </BrowserRouter>
    <Footer />
  </div>
);

export default App;
