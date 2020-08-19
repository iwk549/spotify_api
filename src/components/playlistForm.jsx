import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class PlaylistForm extends Form {
  state = {
    data: {
      playlistIDs: "",
      artistID: "",
      probability: false,
      all_songs: false,
    },
    errors: {},
  };

  schema = {
    playlistIDs: Joi.string().required().label("Playlist IDs"),
    artistID: Joi.string().required().label("Artist ID"),
    probability: Joi.boolean().required().label("Include Probabilities"),
    all_songs: Joi.boolean().required().label("Include All Songs"),
  };

  doSubmit = () => {
    this.props.callbackFunction(this.state.data);
  };

  handleCheck = (event) => {
    const data = { ...this.state.data };
    data[event.target.id] = data[event.target.id] ? false : true;
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
          <input
            type="checkbox"
            className="form-check-input"
            id="all_songs"
            onChange={this.handleCheck}
          />
          <label htmlFor="all_songs" className="form-check-label">
            Include All Songs by Artist
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
