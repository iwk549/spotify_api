import React, { Component } from "react";
import Table from "./common/table";

class TrackTable extends Component {
  columns = [
    { path: "name", label: "Track Name" },
    { path: "artists", label: "Artists" },
    { path: "album_name", label: "Album Name" },
    { path: "playlist_recommendation", label: "Playlist Recommendation" },
  ];

  render() {
    const { tracks, sortColumn, onSort } = this.props;
    return (
      <Table
        data={tracks}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        keyProperty={"id"}
        headerClass="thead-dark"
        tableClass="table-hover table-sm"
      />
    );
  }
}

export default TrackTable;
