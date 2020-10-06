import React, { Component } from "react";
import { getPlaylistRecommendations } from "../services/audioFeaturesService";
import TrackTable from "./trackTable";
import _ from "lodash";
import PlaylistForm from "./playlistForm";
import SearchBox from "./common/searchBox";
import CredentialsForm from "./credentialsForm";
import { toast } from "react-toastify";
import LoadingSpinner from "./common/loadingSpinner";
import TrackTableProbs from "./trackTableWithProbs";
import ExcelDownload from "./common/excelDownload";
import ReadMe from "./readMe";
import { round } from "mathjs";
import { getArtistInfo, getPlaylistInfo } from "../services/nameService";

class Main extends Component {
  state = {
    data: [],
    sortColumn: "trackName",
    searchQuery: "",
    credentialsOpen: false,
    loading: false,
    probability: false,
    all_songs: false,
    readMeOpen: false,
    artistImageURL: "",
    artistName: "",
    artistGenres: "",
    selectedArtist: "",
    selectedPlaylists: [],
    selectedPlaylistIDs: [],
  };

  handleSort = (newSortColumn) => {
    this.setState({ sortColumn: newSortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedLeague: null, currentPage: 1 });
  };

  getArtistCB = async (id) => {
    const params = {
      api_id: localStorage.getItem("api_id"),
      api_key: localStorage.getItem("api_key"),
      artistID: id,
    };
    const response = await getArtistInfo(params);
    if (response.status === 200) {
      response.data.id = id;
      this.setState({
        selectedArtist: response.data,
      });
    } else {
      this.setState({ selectedArtist: "" });
      toast("Artist ID is invalid");
    }
  };

  getPlaylistCB = async (id) => {
    const params = {
      api_id: localStorage.getItem("api_id"),
      api_key: localStorage.getItem("api_key"),
      playlistID: id,
    };
    let selectedPlaylists = [...this.state.selectedPlaylists];
    let selectedPlaylistIDs = [...this.state.selectedPlaylistIDs];
    if (selectedPlaylistIDs.includes(id)) {
      toast("You have already added this playlist.");
      return false;
    }
    const response = await getPlaylistInfo(params);
    if (response.status === 200) {
      selectedPlaylistIDs.push(id);
      response.data.id = id;
      selectedPlaylists.push(response.data);
      this.setState({ selectedPlaylists, selectedPlaylistIDs });
      return true;
    } else {
      toast(response.data);
      return false;
    }
  };

  removePlaylist = (id) => {
    let selectedPlaylists = [...this.state.selectedPlaylists];
    let selectedPlaylistIDs = [...this.state.selectedPlaylistIDs];
    selectedPlaylistIDs = selectedPlaylistIDs.filter((p) => p !== id);
    selectedPlaylists = selectedPlaylists.filter((p) => p.id !== id);
    this.setState({ selectedPlaylistIDs, selectedPlaylists });
  };

  submitCallbackFunction = async (data) => {
    const api_id = localStorage.getItem("api_id");
    const api_key = localStorage.getItem("api_key");
    // if (!api_id || !api_key)
    //   return toast.error("Please set your Spotify credentials.");
    this.setState({ loading: true });
    const params = {
      api_id: localStorage.getItem("api_id"),
      api_key: localStorage.getItem("api_key"),
      playlist_ids: data.playlistIDs.replace(/ /g, ""),
      artist_id: data.artistID,
      probability: data.probability,
      all_songs: data.all_songs,
    };
    const response = await getPlaylistRecommendations(params);
    if (response.status === 200) {
      response.data.forEach((d) => {
        d.album_id = d.album_id[0];
      });
      this.setState({ data: response.data, probability: data.probability });
    } else toast.error(response.data);
    this.setState({ loading: false });
  };

  openCredentials = () => {
    const open = this.state.credentialsOpen ? false : true;
    this.setState({ credentialsOpen: open });
  };

  modalToggle = () => {
    const readMeOpen = this.state.readMeOpen ? false : true;
    this.setState({ readMeOpen });
  };

  renderExcelDownload(data, columns) {
    return <ExcelDownload data={data} columns={columns} />;
  }

  getPageData = () => {
    const { sortColumn, data, searchQuery } = this.state;
    let filteredTracks = data;
    if (searchQuery)
      filteredTracks = data.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const sortedTracks = _.orderBy(
      filteredTracks,
      [sortColumn.path],
      [sortColumn.order]
    );
    return sortedTracks;
  };

  render() {
    const {
      data,
      sortColumn,
      searchQuery,
      credentialsOpen,
      loading,
      probability,
      readMeOpen,
      selectedArtist,
      selectedPlaylists,
      selectedPlaylistIDs,
    } = this.state;
    const sortedTracks = this.getPageData();

    let dataColumns = [];
    let trackTableColumns = [
      { path: "name", label: "Track Name" },
      { path: "artists", label: "Artists" },
      { path: "album_name", label: "Album Name" },
    ];

    let trackTableProbColumns = [...trackTableColumns];
    if (data) {
      for (let property in data[0]) {
        dataColumns.push(property);
        if (property.toLowerCase() !== property) {
          data.forEach((t) => {
            t[property] = round(t[property], 3);
          });
          trackTableProbColumns.push({ path: property, label: property });
        }
      }
    }

    selectedPlaylistIDs.length > 1
      ? trackTableColumns.push({
          path: "playlist_recommendation",
          label: "Playlist Recommendation",
        })
      : trackTableColumns.push({
          path: "euclidean_distance",
          label: "Match Distance",
        });

    return (
      <div className="container">
        <ReadMe
          id="readMe"
          closeModal={this.modalToggle}
          popupOpen={readMeOpen}
        />
        <h2>Spotify Playlist Recommendations</h2>
        <div className="row">
          <div className="col">
            <button
              className="btn btn-sm btn-secondary"
              onClick={this.openCredentials}
            >
              {credentialsOpen
                ? "Close Credentials"
                : "Enter Spotify Credentials"}
            </button>
          </div>
          <div className="col-2">
            <button
              className="btn btn-sm btn-info sticky-top"
              onClick={this.modalToggle}
            >
              ReadMe
            </button>
          </div>
        </div>
        {credentialsOpen && <CredentialsForm callback={this.openCredentials} />}
        <hr />

        <PlaylistForm
          submitCallbackFunction={this.submitCallbackFunction}
          getArtistCB={this.getArtistCB}
          getPlaylistCB={this.getPlaylistCB}
          selectedPlaylistIDs={selectedPlaylistIDs.join(",")}
        />
        {loading && <LoadingSpinner />}
        <hr />
        <div className="row">
          <div className="col" style={{ borderRight: "1px solid grey" }}>
            <h4 className="text-left">
              <small className="text-muted">Selected Artist: </small>
              <a
                href={`https://open.spotify.com/artist/${selectedArtist.id}`}
                target="blank_"
                rel="noopener noreferrer"
              >
                {selectedArtist.name}
              </a>
            </h4>
            {selectedArtist && (
              <React.Fragment>
                <hr />
                <div className="row">
                  <div className="col-sm-4">
                    <b>Followers: </b>
                    {selectedArtist.followers.toLocaleString()}
                    <br />
                    <br />
                    <img
                      alt="artistImage"
                      src={selectedArtist.image}
                      style={{ maxWidth: "150px", maxHeight: "150px" }}
                    />
                  </div>
                  <div className="col-sm-4">
                    <b>Genres: </b>
                    <ul>
                      {selectedArtist.genres.map((g) => (
                        <li key={g}>{g}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
          <div className="col">
            <h4 className="text-left">
              <small className="text-muted">Selected Playlists</small>
            </h4>
            {selectedPlaylists.length > 0 && (
              <React.Fragment>
                {selectedPlaylists.map((p) => (
                  <ul key={p.id}>
                    <b>
                      <a
                        href={`https://open.spotify.com/playlist/${p.id}`}
                        target="blank_"
                        rel="noopener noreferrer"
                      >
                        {p.name}
                      </a>
                    </b>
                    <li>Tracks: {p.tracks === 100 ? "100+" : p.tracks}</li>
                    <li>Followers: {p.followers.toLocaleString()}</li>
                    <li>Owner: {p.owner}</li>
                    <li>Owner userID: {p.owner_id}</li>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => this.removePlaylist(p.id)}
                    >
                      Remove Playlist
                    </button>
                  </ul>
                ))}
              </React.Fragment>
            )}
          </div>
        </div>

        {loading && <LoadingSpinner />}
        <hr />
        {data.length > 0 &&
          dataColumns.length > 0 &&
          this.renderExcelDownload(data, dataColumns)}
        {data.length > 0 && (
          <React.Fragment>
            <SearchBox
              value={searchQuery}
              onChange={this.handleSearch}
              placeholder="Search by track name..."
            />
            {probability && selectedPlaylistIDs.length > 1 ? (
              <TrackTableProbs
                tracks={sortedTracks}
                sortColumn={sortColumn}
                onSort={this.handleSort}
                columns={trackTableProbColumns}
              />
            ) : (
              <TrackTable
                tracks={sortedTracks}
                sortColumn={sortColumn}
                onSort={this.handleSort}
                columns={trackTableColumns}
              />
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Main;
