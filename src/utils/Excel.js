import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import FileIcon from "material-ui/svg-icons/file/file-download";

import { default as ExcelFile, ExcelSheet, ExcelColumn } from "react-data-export";

class ExportStanden extends React.Component {
  renderColumns = keys => {
    console.log("In KEYS");
    return [
      <ExcelColumn key={1} label="fullname" value="fullname" />,
      <ExcelColumn key={2} label="hours" value="hours" />,
      <ExcelColumn key={3} label="team" value="team" />,
      <ExcelColumn key={4} label="location" value="location" />
    ];
    return keys.map((key, index) => {
      const nkey = `"${key}"`;
      console.log(`<ExcelColumn key=${index} label=${nkey} value=${nkey} />`);
      return <ExcelColumn key={index} label={key} value={key} />;
    });
  };
  render() {
    const { history, classes, data } = this.props;
    if (data.length === 0) return <div>No Data</div>;

    const keys = Object.keys(data[0]);
    console.log(keys, data);
    return (
      <ExcelFile
        filename="Download.xlsx"
        element={<RaisedButton label="download" primary={true} />}
      >
        <ExcelSheet data={data} name="data">
          {this.renderColumns(keys)}
        </ExcelSheet>
      </ExcelFile>
    );
  }
}

export default ExportStanden;
