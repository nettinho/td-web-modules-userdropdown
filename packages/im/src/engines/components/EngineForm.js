import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { Button, Form } from "semantic-ui-react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { injectIntl } from "react-intl";
import { getDatalakes } from "../selectors";

export class EngineForm extends React.Component {
  static propTypes = {
    datalakes: PropTypes.array,
    history: PropTypes.object,
    isSubmitting: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    intl: PropTypes.object
  };

  constructor(props) {
    super(props);
    const engine = {
      datalake_id: "",
      system: "",
      source: "",
      database: "",
      username: "",
      password: "",
      host: "",
      port: ""
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.state = { engine };
  }

  handleChange = (event, data) => {
    const { name, value } = data;
    let { engine } = this.state;
    engine = { ...engine, [name]: value };
    this.setState({ engine });
    event.preventDefault();
  };

  handleOnSubmit = event => {
    const { engine } = this.state;
    const { handleSubmit } = this.props;
    handleSubmit({ engine });
    event.preventDefault();
  };

  handleCancel = event => {
    this.props.history.goBack();
    event.preventDefault();
  };

  getDatalakesOptions = datalakes => {
    return _.flow(
      _.map(_.pick(["id", "name"])),
      _.map(({ id, name }) => ({ key: id, text: name, value: id }))
    )(datalakes);
  };

  render() {
    const { datalakes, intl, isSubmitting } = this.props;
    const { engine } = this.state;
    const { formatMessage } = intl;

    const datalakeOptions = _.isEmpty(datalakes)
      ? []
      : this.getDatalakesOptions(datalakes);

    return (
      <Form onSubmit={this.handleOnSubmit}>
        <Form.Dropdown
          name="datalake_id"
          label={formatMessage({ id: "intake.engine.datalake" })}
          basic
          onChange={this.handleChange}
          value={engine.datalake_id}
          placeholder={formatMessage({
            id: "intake.engine.datalake.placeholder"
          })}
          options={datalakeOptions}
          search
          selection
        />
        <Form.Input
          name="system"
          label={formatMessage({ id: "intake.engine.system" })}
          onChange={this.handleChange}
          value={engine.system}
          placeholder={formatMessage({
            id: "intake.engine.system.placeholder"
          })}
          autoComplete="off"
          required
        />
        <Form.Input
          name="source"
          label={formatMessage({ id: "intake.engine.source" })}
          onChange={this.handleChange}
          value={engine.source}
          placeholder={formatMessage({
            id: "intake.engine.source.placeholder"
          })}
          autoComplete="off"
          required
        />
        <Form.Input
          name="database"
          label={formatMessage({ id: "intake.engine.database" })}
          onChange={this.handleChange}
          value={engine.database}
          placeholder={formatMessage({
            id: "intake.engine.database.placeholder"
          })}
          autoComplete="off"
          required
        />
        <Form.Input
          name="host"
          label={formatMessage({ id: "intake.engine.host" })}
          onChange={this.handleChange}
          value={engine.host}
          placeholder={formatMessage({
            id: "intake.engine.host.placeholder"
          })}
          autoComplete="off"
          required
        />
        <Form.Input
          name="port"
          label={formatMessage({ id: "intake.engine.port" })}
          onChange={this.handleChange}
          value={engine.port}
          placeholder={formatMessage({
            id: "intake.engine.port.placeholder"
          })}
          autoComplete="off"
          required
        />
        <Form.Input
          name="username"
          label={formatMessage({ id: "intake.engine.username" })}
          onChange={this.handleChange}
          value={engine.username}
          placeholder={formatMessage({
            id: "intake.engine.username.placeholder"
          })}
          autoComplete="off"
          required
        />
        <Form.Input
          name="password"
          label={formatMessage({ id: "intake.engine.password" })}
          onChange={this.handleChange}
          value={engine.password}
          placeholder={formatMessage({
            id: "intake.engine.password.placeholder"
          })}
          autoComplete="off"
          required
        />
        <Button
          type="submit"
          primary
          loading={isSubmitting}
          disabled={isSubmitting}
          content={formatMessage({ id: "intake.engine.actions.launch" })}
        />
        <Button
          onClick={this.handleCancel}
          content={formatMessage({ id: "actions.cancel" })}
        />
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  datalakes: getDatalakes(state),
  isSubmitting: state.engineCreating
});

export default compose(
  withRouter,
  injectIntl,
  connect(mapStateToProps)
)(EngineForm);
