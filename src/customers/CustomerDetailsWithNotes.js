import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import ClearIcon from "material-ui/svg-icons/content/clear";
import _ from "lodash";
import { format } from "date-fns";
import { WideTitle, colorAr, getColor } from "../styles";

class CustomerDetailsWithNotes extends Component {
  state = {};

  renderNote = ({ id, note, date, day }, index) => {
    return [
      <ListItem
        leftAvatar={
          <Avatar backgroundColor={getColor(index, colorAr)} color="white">
            {day.toString().toUpperCase()}
          </Avatar>
        }
        primaryText={note || "No update"}
        key={id}
        rightIcon={<ClearIcon />}
      />,
      <Divider key={`${id}d`} />
    ];
  };

  renderMonth = (month, notes) => {
    return [
      <div key={month}>
        <WideTitle>{month}</WideTitle>
        <List>
          {_.chain(notes)
            .filter(note => note.month === month)
            .orderBy(["newdate"], ["desc"])

            .value()
            .map((note, index) => this.renderNote(note, index))}
        </List>
      </div>
    ];
  };
  getMonths = notes => {
    return _.chain(notes)
      .map(o => _.pick(o, ["month"]))
      .uniqBy("month")
      .value();
  };

  render() {
    if (!this.props.details) {
      return <div>Loading..</div>;
    }

    const notes =
      _.sortBy(this.props.details.notes, ["date"], "desc").map(note =>
        _.extend({}, note, {
          month: format(note.date, "MMMM"),
          day: parseInt(format(note.date, "DD")),
          newdate: Date.parse(note.date)
        })
      ) || [];
    const months = this.getMonths(notes);
    return months.map(({ month }) => this.renderMonth(month, notes));
  }
}

export default CustomerDetailsWithNotes;
