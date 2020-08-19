import React, { Component } from "react";
import ReactExport from "react-export-excel";

class ExcelDownload extends Component {
  render() {
    const { data, columns } = this.props;
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
    return (
      <ExcelFile
        element={
          <button className="btn btn-success btn-sm">
            Download Full Data to Excel
          </button>
        }
      >
        <ExcelSheet data={data} name="All Data">
          {columns.map((c) => (
            <ExcelColumn key="id" label={c} value={c} />
          ))}
          {/* <ExcelColumn label="Track Name" value="name" /> */}
        </ExcelSheet>
      </ExcelFile>
    );
  }
}

export default ExcelDownload;
