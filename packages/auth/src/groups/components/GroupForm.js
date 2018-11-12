import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, Message } from "semantic-ui-react";
import { injectIntl } from "react-intl";
import { compose } from "redux";
import { connect } from "react-redux";
import { Alert } from "@truedat/core/components";
import { run } from "@truedat/core/validation";

class GroupForm extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    group: PropTypes.object,
    isSubmitting: PropTypes.bool,
    fieldValidations: PropTypes.array,
    handleSubmit: PropTypes.func
  };

  constructor(props) {
    super(props);
    const defaults = {
      name: "",
      description: ""
    };
    const group = Object.assign({}, defaults, props.group);
    const touched = false;
    const showErrors = false;
    const validationErrors = {};

    this.state = { group, touched, showErrors, validationErrors };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(e, data) {
    const { name, value, checked } = data;
    const fieldValidations = this.props.fieldValidations
      ? this.props.fieldValidations
      : [];

    const group = Object.assign({}, this.state.group, {
      [name]: value || checked
    });
    const validationErrors = run(group, fieldValidations);
    const showErrors =
      Object.keys(validationErrors).length === 0 ? false : true;
    const newState = Object.assign({}, this.state, {
      group,
      touched: true,
      validationErrors: validationErrors,
      showErrors: showErrors
    });

    this.setState(newState);
    e.preventDefault();
  }

  handleSubmit(event) {
    const { group } = this.state;
    this.props.handleSubmit({ group });
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
    const {
      isSubmitting,
      intl: { formatMessage }
    } = this.props;
    const { group, showErrors, touched } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} warning={showErrors}>
        <Form.Input
          name="name"
          label={formatMessage({ id: "groups.props.name" })}
          onChange={this.handleChange}
          value={group.name || ""}
          placeholder={formatMessage({ id: "groups.props.name.placeholder" })}
          autoComplete="off"
          required
        />
        <Form.Input
          name="description"
          label={formatMessage({ id: "groups.props.description" })}
          onChange={this.handleChange}
          value={group.description || ""}
          placeholder={formatMessage({
            id: "groups.props.description.placeholder"
          })}
          autoComplete="off"
        />
        <Message
          warning
          header={formatMessage({ id: "groups.warning.fields" })}
          list={this.displayErrors()}
        />
        <Button
          type="submit"
          primary
          loading={isSubmitting}
          disabled={!touched || showErrors}
        >
          {formatMessage({ id: "groups.form.save" })}
        </Button>
        <Button onClick={this.handleCancel} disabled={isSubmitting}>
          {formatMessage({ id: "groups.form.cancel" })}
        </Button>
        <Alert />
      </Form>
    );
  }
}

const mapStateToProps = ({ groupCreating, message }) => ({
  isSubmitting: groupCreating,
  err: message.error
});

export default compose(
  withRouter,
  injectIntl,
  connect(mapStateToProps)
)(GroupForm);
