import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Main from "./components/main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover
          pauseOnFocusLoss
        />
        <NavBar />
        <Main />
      </React.Fragment>
    );
  }
}

export default App;
