import React, { Component } from "react";
import { getTopTracks } from "../services/audioFeaturesService";
import TrackTable from "./trackTable";
import _ from "lodash";
import PlaylistForm from "./playlistForm";
import SearchBox from "./common/searchBox";

class Main extends Component {
  state = {
    data: [],
    sortColumn: "trackName",
    searchQuery: "",
  };

  handleSort = (newSortColumn) => {
    this.setState({ sortColumn: newSortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedLeague: null, currentPage: 1 });
  };

  async componentDidMount() {
    const response = await getTopTracks("53QeCVwCAOdxJ3p7BG4ZUn");
    if (response.status === 200) this.setState({ data: response.data });
  }

  callbackFunction = (data) => {
    console.log(data);
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
    const { data, sortColumn, searchQuery } = this.state;
    const sortedTracks = this.getPageData();
    return (
      <div className="container">
        <h2>Spotify Playlist Recommendations</h2>
        <PlaylistForm data={data} callbackFunction={this.callbackFunction} />
        {sortedTracks.length < 0 && (
          <React.Fragment>
            <SearchBox
              value={searchQuery}
              onChange={this.handleSearch}
              placeholder="Search by track name..."
            />
            <TrackTable
              tracks={sortedTracks}
              sortColumn={sortColumn}
              onSort={this.handleSort}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Main;
