import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";

class PlaylistForm extends Form {
  state = {
    data: {
      playlistIDs: "",
      artistID: "",
      probability: false,
      all_songs: false,
    },
    playlistID: "",
    errors: {},
    apiError: null,
  };

  schema = {
    playlistIDs: Joi.string().required().label("Playlist IDs"),
    artistID: Joi.string().required().min(22).max(22).label("Artist ID"),
    probability: Joi.boolean().required().label("Include Probabilities"),
    all_songs: Joi.boolean().required().label("Include All Songs"),
  };

  doSubmit = () => {
    let data = { ...this.state.data };
    data.playlistIDs = this.props.selectedPlaylistIDs;
    this.props.submitCallbackFunction(data);
  };

  getArtistCB = (id) => {
    this.props.getArtistCB(id);
  };

  addPlaylist = async (event) => {
    event.preventDefault();
    let { playlistID } = this.state;
    if (playlistID.length === 22) {
      await this.props.getPlaylistCB(playlistID);
      let data = { ...this.state.data };
      data.playlistIDs = this.props.selectedPlaylistIDs;
      this.setState({ data });
    } else toast("Playlist ids should be 22 characters in length.");
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
          <label htmlFor="playlistID">Playlist ID</label>
          <input
            className="form-control"
            id="playlistID"
            onChange={(event) =>
              this.setState({ playlistID: event.target.value })
            }
          />
          <button className="btn btn-sm btn-dark" onClick={this.addPlaylist}>
            Add Playlist
          </button>
          <br />
          <br />
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
