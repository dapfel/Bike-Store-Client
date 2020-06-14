import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BikesGrid from "./BikesGrid";
import SignUpDialog from "./SignUpDialog";
import LoginDialog from "./LoginDialog";

class App extends Component {
state = {
    data: null,
    isLoggedIn: false
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err));
  }
  
  callBackendAPI = async () => {
    const response = await fetch('/bikes');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <Header isLoggedIn={this.state.isLoggedIn} />
        <BikesGrid />
        <p>{this.state.data}</p>
        <Footer />
      </div>
    );
  }
}

export default App;