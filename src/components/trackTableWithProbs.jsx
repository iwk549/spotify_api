import React, { Component } from "react";
import Table from "./common/table";

class TrackTableProbs extends Component {
  columns = [
    { path: "name", label: "Track Name" },
    { path: "artists", label: "Artists" },
    { path: "album_name", label: "Album Name" },
  ];

  constructor(props) {
    super(props);
    for (let property in props.tracks[0]) {
      if (property.toLowerCase() !== property) {
        props.tracks.forEach((t) => {
          t[property] = t[property].toLocaleString("en", {
            style: "percent",
            minimumFractionDigits: 2,
          });
        });
        this.columns.push({ path: property, label: property });
      }
    }
  }

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

export default TrackTableProbs;
