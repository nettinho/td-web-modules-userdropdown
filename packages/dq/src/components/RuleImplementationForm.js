import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { Button, Form } from "semantic-ui-react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { injectIntl } from "react-intl";
import { getRuleTypes } from "../selectors";

const to_type = (value, type) => {
  if (type == "integer") {
    return parseInt(value);
  } else {
    return value;
  }
};

const formatSystemParam = (name, value, rule_type) => {
  const param = rule_type.params.system_params.find(x => x.name == name);
  return to_type(value, param.type);
};

const SystemParam = ({ type_param, handleChange }) => (
  <Form.Input
    name={type_param.name}
    fluid
    label={type_param.name}
    onChange={handleChange}
    autoComplete="off"
    required
  />
);

SystemParam.propTypes = {
  type_param: PropTypes.object,
  handleChange: PropTypes.func
};

const RuleImplementationSystemParamsForm = ({
  params,
  ruleImplementation,
  handleChange,
  formatMessage
}) => (
  <Form.Group widths="equal">
    {params.system_params.map(type_param => (
      <SystemParam
        key={type_param.name}
        type_param={type_param}
        handleChange={handleChange}
        value={_.pick(ruleImplementation.system_params, type_param.name)}
        formatMessage={formatMessage}
        ruleImplementation={ruleImplementation}
      />
    ))}
  </Form.Group>
);

RuleImplementationSystemParamsForm.propTypes = {
  ruleImplementation: PropTypes.object,
  params: PropTypes.object,
  handleChange: PropTypes.func,
  formatMessage: PropTypes.func
};

export class RuleImplementationForm extends React.Component {
  static propTypes = {
    rule: PropTypes.object,
    ruleImplementation: PropTypes.object,
    history: PropTypes.object,
    isSubmitting: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    intl: PropTypes.object,
    params: PropTypes.object
  };

  constructor(props) {
    super(props);
    const defaults = {
      implementation_key: "",
      description: "",
      system: "",
      system_params: {}
    };
    const ruleImplementation = Object.assign(
      {},
      defaults,
      props.ruleImplementation
    );
    const touched = false;
    this.state = { ruleImplementation, touched };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChangeSystemParams = this.handleChangeSystemParams.bind(this);
  }

  handleChange(event, data) {
    const { name, value } = data;
    const ruleImplementation = Object.assign(
      {},
      this.state.ruleImplementation,
      { [name]: value }
    );
    this.setState({ ruleImplementation, touched: true });
    event.preventDefault();
  }

  handleChangeSystemParams(event, data) {
    const { name, value } = data;
    const new_value = Object.assign(
      {},
      this.state.ruleImplementation.system_params,
      {
        [name]: value
      }
    );
    const ruleImplementation = Object.assign(
      {},
      this.state.ruleImplementation,
      {
        ["system_params"]: new_value
      }
    );
    this.setState({ ruleImplementation, touched: true });
    event.preventDefault();
  }

  handleSubmit(event) {
    const { ruleImplementation } = this.state;
    const { rule } = this.props;
    const { rule_type } = rule;
    const rule_id = { rule_id: rule.id };
    const rule_implementation = Object.assign({}, ruleImplementation, rule_id);

    const system_params = _.reduce((acc, k) => {
      acc[k] = formatSystemParam(
        k,
        ruleImplementation.system_params[k],
        rule_type
      );
      return acc;
    }, {})(_.keys(ruleImplementation.system_params));

    this.props.handleSubmit({
      rule_implementation: { ...rule_implementation, system_params },
      ids: this.props.match.params
    });
    event.preventDefault();
  }

  handleCancel(event) {
    this.props.history.goBack();
    event.preventDefault();
  }

  render() {
    const { rule, isSubmitting, intl } = this.props;
    const { formatMessage } = intl;
    const { ruleImplementation } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          name="implementation_key"
          label={formatMessage({ id: "ruleImplementation.props.name" })}
          onChange={this.handleChange}
          value={ruleImplementation.implementation_key}
          placeholder={formatMessage({
            id: "ruleImplementation.props.name.placeholder"
          })}
          autoComplete="off"
        />
        <Form.TextArea
          name="description"
          label={formatMessage({ id: "ruleImplementation.props.description" })}
          onChange={this.handleChange}
          value={ruleImplementation.description}
          placeholder={formatMessage({
            id: "ruleImplementation.props.description.placeholder"
          })}
          autoComplete="off"
        />
        <Form.Input
          name="system"
          label={formatMessage({ id: "ruleImplementation.props.system" })}
          onChange={this.handleChange}
          value={ruleImplementation.system}
          placeholder={formatMessage({
            id: "ruleImplementation.props.system.placeholder"
          })}
          autoComplete="off"
        />
        {!_.isEmpty(rule) &&
          _.has("system_params")(rule.rule_type.params) &&
          RuleImplementationSystemParamsForm({
            params: rule.rule_type.params,
            ruleImplementation,
            handleChange: this.handleChangeSystemParams,
            formatMessage
          })}
        <Button
          type="submit"
          primary
          loading={isSubmitting}
          disabled={isSubmitting || !this.state.touched}
          content={formatMessage({ id: "actions.save" })}
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
  rule: state.rule,
  isSubmitting:
    state.ruleImplementationCreating || state.ruleImplementationUpdating
});

export default compose(
  withRouter,
  injectIntl,
  connect(mapStateToProps)
)(RuleImplementationForm);
