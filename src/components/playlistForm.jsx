import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class PlaylistForm extends Form {
  state = {
    data: {
      playlistIDs: "",
      artistID: "",
      probability: false,
    },
    errors: {},
  };

  schema = {
    playlistIDs: Joi.string().required().label("Playlist IDs"),
    artistID: Joi.string().required().label("Artist ID"),
    probability: Joi.boolean().required().label("Include Probabilities"),
  };

  doSubmit = () => {
    this.props.callbackFunction(this.state.data);
  };

  handleCheck = (event) => {
    const data = { ...this.state.data };
    data.probability = data.probability ? false : true;
    this.setState({ data });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            "playlistIDs",
            "Playlist IDs (Separate each id with a comma)",
            "autofocus"
          )}
          {this.renderInput("artistID", "Artist ID")}
          <input
            type="checkbox"
            className="form-check-input"
            id="probability"
            onChange={this.handleCheck}
          />
          <label htmlFor="probability" className="form-check-label">
            Include Match Probabilities
          </label>
          <br />
          <br />
          {this.renderValidatedButton("Get Recommendations")}
        </form>
      </div>
    );
  }
}

export default PlaylistForm;
