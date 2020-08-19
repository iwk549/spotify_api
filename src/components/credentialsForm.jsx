import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";

class CredentialsForm extends Form {
  state = {
    data: {
      api_id: "",
      api_key: "",
    },
    errors: {},
  };

  componentDidMount() {
    let data = { ...this.state.data };
    data.api_id = localStorage.getItem("api_id");
    data.api_key = localStorage.getItem("api_key");
    this.setState({ data });
  }

  schema = {
    api_id: Joi.string().required().label("Client ID"),
    api_key: Joi.string().required().label("Client Secret"),
  };

  removeCredentials = (event) => {
    event.preventDefault();
    localStorage.removeItem("api_id");
    localStorage.removeItem("api_key");
    window.location.reload();
  };

  doSubmit = () => {
    localStorage.setItem("api_id", this.state.data.api_id);
    localStorage.setItem("api_key", this.state.data.api_key);
    this.props.callback();
    toast.success("Credentials Saved");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("api_id", "Client ID")}
          {this.renderInput("api_key", "Client Secret", "", "password")}
          {this.renderValidatedButton("Save Credentials")}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className="btn btn-sm btn-warning"
            onClick={this.removeCredentials}
          >
            Remove Credentials
          </button>
        </form>
      </div>
    );
  }
}

export default CredentialsForm;
