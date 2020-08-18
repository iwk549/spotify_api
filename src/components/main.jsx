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

class Main extends Component {
  state = {
    data: [],
    sortColumn: "trackName",
    searchQuery: "",
    credentialsOpen: false,
    loading: false,
    probability: false,
  };

  handleSort = (newSortColumn) => {
    this.setState({ sortColumn: newSortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedLeague: null, currentPage: 1 });
  };

  callbackFunction = async (data) => {
    this.setState({ loading: true });
    const params = {
      api_id: localStorage.getItem("api_id"),
      api_key: localStorage.getItem("api_key"),
      playlist_ids: data.playlistIDs.replace(/ /g, ""),
      artist_id: data.artistID,
      probability: data.probability,
    };
    const response = await getPlaylistRecommendations(params);
    if (response.status === 200)
      this.setState({ data: response.data, probability: data.probability });
    else toast.error(response.data);
    this.setState({ loading: false });
  };

  openCredentials = () => {
    const open = this.state.credentialsOpen ? false : true;
    this.setState({ credentialsOpen: open });
  };

  getPageData = () => {
    const { sortColumn, data, searchQuery } = this.state;
    let filteredTracks = data;
    if (searchQuery)
      filteredTracks = data.filter((t) => {
        t.name.toLowerCase().includes(searchQuery.toLowerCase());
      });

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
    } = this.state;
    const sortedTracks = this.getPageData();
    return (
      <div className="container">
        <h2>Spotify Playlist Recommendations</h2>
        <button
          className="btn btn-sm btn-secondary"
          onClick={this.openCredentials}
        >
          {credentialsOpen ? "Close Credentials" : "Enter Spotify Credentials"}
        </button>
        {credentialsOpen && <CredentialsForm callback={this.openCredentials} />}
        <hr />
        <PlaylistForm data={data} callbackFunction={this.callbackFunction} />
        {loading && <LoadingSpinner />}
        <hr />
        {sortedTracks.length > 0 && (
          <React.Fragment>
            <SearchBox
              value={searchQuery}
              onChange={this.handleSearch}
              placeholder="Search by track name..."
            />
            {probability ? (
              <TrackTableProbs
                tracks={sortedTracks}
                sortColumn={sortColumn}
                onSort={this.handleSort}
              />
            ) : (
              <TrackTable
                tracks={sortedTracks}
                sortColumn={sortColumn}
                onSort={this.handleSort}
              />
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Main;
