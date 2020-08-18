import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return this.state.disabled || null;
    const errors = {};
    for (let detail of error.details) errors[detail.path[0]] = detail.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors, apiError: null });
  };

  renderValidatedButton(label) {
    return (
      <button
        name={label}
        disabled={this.validate()}
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }

  renderCancelButton(label) {
    return (
      <button
        name={label}
        className="btn btn-seconday"
        onClick={this.handleCancel}
      >
        {label}
      </button>
    );
  }

  renderResetButton(label) {
    return (
      <button
        name={label}
        className="btn btn-seconday"
        onClick={this.handleReset}
      >
        {label}
      </button>
    );
  }

  renderInput(
    name,
    label,
    autofocus = "",
    type = "text",
    disabled = "",
    max = ""
  ) {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        type={type}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        autoFocus={autofocus}
        error={errors[name]}
        disabled={disabled}
        max={max}
      />
    );
  }
}

export default Form;
