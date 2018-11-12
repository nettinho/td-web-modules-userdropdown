import _ from "lodash/fp";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Button, Form, Message } from "semantic-ui-react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Alert } from "@truedat/core/components";
import { run } from "@truedat/core/validation";
import { injectIntl, FormattedMessage } from "react-intl";

const toOption = (g, i) => ({ key: i, text: g, value: g });
const groupOptions = (groups, values) =>
  _.flow(
    _.concat(""),
    _.concat(values),
    _.filter(_.isString),
    _.uniq,
    _.sortBy(_.lowerCase),
    _.map.convert({ cap: false })(toOption)
  )(groups);

class UserForm extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    user: PropTypes.object,
    isSubmitting: PropTypes.bool,
    edit: PropTypes.bool,
    groups: PropTypes.array,
    fieldValidations: PropTypes.array,
    handleSubmit: PropTypes.func,
    intl: PropTypes.object
  };

  constructor(props) {
    super(props);
    const defaults = {
      user_name: "",
      email: "",
      full_name: "",
      groups: [],
      password: "",
      rep_password: "",
      is_admin: false
    };
    const user = Object.assign({}, defaults, props.user);
    const touched = false;
    const showErrors = false;
    const validationErrors = {};

    this.state = { user, touched, showErrors, validationErrors };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(e, data) {
    const { name, value, checked } = data;
    const fieldValidations = this.props.fieldValidations
      ? this.props.fieldValidations
      : [];

    const user = Object.assign({}, this.state.user, {
      [name]: value || checked
    });
    const validationErrors = run(user, fieldValidations);
    const showErrors = Object.keys(validationErrors).length !== 0;
    const newState = Object.assign({}, this.state, {
      user,
      touched: true,
      validationErrors: validationErrors,
      showErrors: showErrors
    });

    this.setState(newState);
    e.preventDefault();
  }

  handleSubmit(event) {
    const { user } = this.state;
    this.props.handleSubmit({ user });
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
      groups,
      edit,
      intl: { formatMessage }
    } = this.props;
    const { user, showErrors, touched } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} warning={showErrors}>
        <Form.Input
          name="user_name"
          label={formatMessage({ id: "user.form.user_name" })}
          onChange={this.handleChange}
          value={user.user_name || ""}
          placeholder="jane01"
          autoComplete="off"
          required
        />
        <Form.Input
          name="email"
          label={formatMessage({ id: "user.form.email" })}
          onChange={this.handleChange}
          value={user.email || ""}
          placeholder="jane.doe@truedat.net"
          autoComplete="off"
          required
        />
        <Form.Input
          name="full_name"
          label={formatMessage({ id: "user.form.full_name" })}
          onChange={this.handleChange}
          value={user.full_name || ""}
          placeholder="Jane Doe"
          autoComplete="off"
          required
        />
        <Form.Dropdown
          name="groups"
          label={formatMessage({ id: "user.form.groups" })}
          search
          selection
          multiple
          value={user.groups}
          options={groupOptions(groups, user.groups)}
          allowAdditions
          onChange={this.handleChange}
          placeholder="Select groups..."
        />
        {!edit && (
          <Fragment>
            <Form.Input
              name="password"
              type="password"
              label={formatMessage({ id: "user.form.password" })}
              onChange={this.handleChange}
              value={user.password || ""}
              autoComplete="off"
              required
            />
            <Form.Input
              name="rep_password"
              type="password"
              label={formatMessage({ id: "user.form.pasword_confirmation" })}
              onChange={this.handleChange}
              value={user.rep_password || ""}
              autoComplete="off"
              required
            />
          </Fragment>
        )}
        <Form.Checkbox
          name="is_admin"
          label={formatMessage({ id: "user.form.superadmin" })}
          checked={user.is_admin || false}
          onChange={this.handleChange}
        />
        <Message
          warning
          header={formatMessage({ id: "user.form.check_something" })}
          list={this.displayErrors()}
        />
        <Button
          type="submit"
          primary
          loading={isSubmitting}
          disabled={!touched || showErrors}
        >
          <FormattedMessage id="user.form.save" defaultMessage="Guardar" />
        </Button>
        <Button onClick={this.handleCancel} disabled={isSubmitting}>
          <FormattedMessage id="user.form.cancel" defaultMessage="Cancelar" />
        </Button>
        <Alert />
      </Form>
    );
  }
}

const mapStateToProps = ({ userUpdating, userCreating, message, groups }) => ({
  isSubmitting: userUpdating || userCreating,
  err: message.error,
  groups: groups.map(g => g.name)
});

export default compose(
  withRouter,
  injectIntl,
  connect(mapStateToProps)
)(UserForm);
