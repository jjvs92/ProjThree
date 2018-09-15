import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import API from "../../utils/API";
import MissionStatement from "../../components/MissionStatement/missionStatement";
import Header from "../../components/Navs/Header";
import AdminHeader from "../../components/Navs/AdminHeader";
import SideBar from "../../components/Sidebar/Sidebar";
import HomeArt from "../../components/HomeArt/HomeArt";
import firstImage from "../../assets/images/art1.jpg";
import secondImage from "../../assets/images/art2.jpg";
import thirdImage from "../../assets/images/art3.jpg";
import "./Home.css";

class App extends Component {
  state = {
    amount: 0,
    carousel: [],
    user: {},
    firstImage,
    secondImage,
    thirdImage
  };

  componentDidMount() {
    // this.loadProducts();
    this.props.fetchUser();
    this.loadCurrentUser();
  }

  loadCarouselProducts = () => {
    API.getCarouselProduct()
      .then(res => this.setState({ carousel: res.data }))
      .catch(err => console.log(err));
  };

  loadCurrentUser = () => {
    fetch("/api/current_user")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            user: result
          });

          // console.log('result', result)
          let currentUser = this.state.user;
          API.createUser(currentUser)
            .then(console.log("success"))
            .catch(err => console.log(err));
          this.loadCarouselProducts();
          console.log("state", this.state.user);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  clicked = name => {
    console.log("test");
    console.log("name", name); // trying to return the name of the product name

    const updatedAmount = this.state.amount + 1;
    this.setState({ amount: updatedAmount });
  };

  render() {
    return (
      <div className="homeGrid">
        {this.state.user.admin ? (
          <AdminHeader amount={this.state.amount} />
        ) : (
          <Header key="1" amount={this.state.amount} />
        )}
        <SideBar user={this.state.user} />
        <MissionStatement />
        <HomeArt
          imagePlaceholder={this.state.imagePlaceholder}
          firstImage={this.state.firstImage}
          secondImage={this.state.secondImage}
          thirdImage={this.state.thirdImage}
        />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
