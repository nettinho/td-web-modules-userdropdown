import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, Message } from "semantic-ui-react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Alert } from "@truedat/core/components";
import { run } from "@truedat/core/validation";

class RoleForm extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    role: PropTypes.object,
    isSubmitting: PropTypes.bool,
    fieldValidations: PropTypes.array,
    handleSubmit: PropTypes.func
  };

  constructor(props) {
    super(props);
    const defaults = {
      name: ""
    };
    const role = Object.assign({}, defaults, props.role);
    const touched = false;
    const showErrors = false;
    const validationErrors = {};

    this.state = { role, touched, showErrors, validationErrors };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(e, data) {
    const { name, value, checked } = data;
    const fieldValidations = this.props.fieldValidations
      ? this.props.fieldValidations
      : [];

    const role = Object.assign({}, this.state.role, {
      [name]: value || checked
    });
    const validationErrors = run(role, fieldValidations);
    const showErrors =
      Object.keys(validationErrors).length === 0 ? false : true;
    const newState = Object.assign({}, this.state, {
      role,
      touched: true,
      validationErrors: validationErrors,
      showErrors: showErrors
    });

    this.setState(newState);
    e.preventDefault();
  }

  handleSubmit(event) {
    const { role } = this.state;
    this.props.handleSubmit({ role });
    event.preventDefault();
  }

  handleCancel(event) {
    this.props.history.goBack();
    event.preventDefault();
  }

  displayErrors() {
    return Object.entries(this.state.validationErrors).map(x => x[1]);
  }

  render() {
    const { isSubmitting } = this.props;
    const { role, showErrors, touched } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} warning={showErrors}>
        <Form.Input
          name="name"
          label="Name"
          onChange={this.handleChange}
          value={role.name || ""}
          placeholder="Role Name"
          autoComplete="off"
          required
        />
        <Message
          warning
          header="Could you check something!"
          list={this.displayErrors()}
        />
        <Button
          type="submit"
          primary
          loading={isSubmitting}
          disabled={!touched || showErrors}
        >
          Save
        </Button>
        <Button onClick={this.handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Alert />
      </Form>
    );
  }
}

const mapStateToProps = ({ roleCreating, message }) => ({
  isSubmitting: roleCreating,
  err: message.error
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(RoleForm);
