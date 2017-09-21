import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withRouter, Link } from "react-router-dom";
import { CardSection, Card, Input } from "../common";
import { blue500 } from "material-ui/styles/colors";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import { fetchAlertItem, updateAlerts, deleteAlert } from "../actions/index";

const aTypes = [
  { type: "Notification", value: "Notification" },
  { type: "Alert", value: "Alert" },
  { type: "Warning", value: "Warning" }
];

class AlertItem extends React.Component {
  componentWillMount() {
    this.props.fetchAlertItem(this.props.match.params.id);
  }
  onDeleteClick = e => {
    e.preventDefault();
    this.props.deleteAlert(this.props.match.params.id).then(() => {
      this.props.history.push("/alerts");
    });
  };
  _onSubmit = async values => {
    await updateAlerts(values);
    this.props.history.push = "/alerts";
  };
  render() {
    if (!this.props.alerts[0]) {
      return <div>Loading</div>;
    }
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this._onSubmit)}>
        <Card>
          <CardSection>
            <Field
              name="title"
              component={Input}
              placeholder="title"
              id="title"
              width={8}
            />
            <Field name="body" component={Input} placeholder="text" width={8} />
          </CardSection>
          <CardSection>
            <Field
              name="alerttype"
              component={Input}
              data={aTypes}
              width={3}
              placeholder="type"
            />
            <Field name="username" component={Input} placeholder="username" />
          </CardSection>
          <Divider />
          <CardSection>
            <p>
              <RaisedButton
                type="submit"
                backgroundColor={blue500}
                primary={true}
              >
                Save
              </RaisedButton>
              <Link to="/news" type="cancel" className="btn btn-primary black">
                Cancel
              </Link>
              <RaisedButton onClick={this.onDeleteClick}>Delete</RaisedButton>
            </p>
          </CardSection>
        </Card>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return { alerts: state.alerts.alerts, initialValues: state.alerts.alerts[0] };
};
AlertItem = reduxForm({ form: "alertitem" })(AlertItem);

export default connect(mapStateToProps, { fetchAlertItem, deleteAlert })(
  withRouter(AlertItem)
);
