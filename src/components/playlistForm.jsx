import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class PlaylistForm extends Form {
  state = {
    data: {
      playlistIDs: "",
      artistID: "",
    },
    errors: {},
  };

  schema = {
    playlistIDs: Joi.string().required().label("Playlist IDs"),
    artistID: Joi.string().required().label("Artist ID"),
  };

  doSubmit = () => {
    this.props.callbackFunction(this.state.data);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("playlistIDs", "Playlist IDs", "autofocus")}
          {this.renderInput("artistID", "Artist ID")}
          {this.renderValidatedButton("Get Recommendations")}
        </form>
      </div>
    );
  }
}

export default PlaylistForm;
