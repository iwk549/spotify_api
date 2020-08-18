import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Main from "./components/main";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Main />
      </React.Fragment>
    );
  }
}

export default App;
