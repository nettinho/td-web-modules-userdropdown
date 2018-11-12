import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Radio } from "semantic-ui-react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { injectIntl } from "react-intl";
import { getRulesTags, getRuleTypes } from "../selectors";

const toOption = ({ t, v, i }) => ({ key: i, text: t, value: v });

const ruleTypesOptions = (ruleTypes, formatMessage) => {
  return _.flow(
    _.map(_.pick(["id", "name"])),
    _.map(x =>
      toOption({
        i: _.get("id")(x),
        v: _.get("id")(x),
        t: formatMessage({ id: `rule.type.${_.get("name")(x)}` })
      })
    )
  )(ruleTypes);
};

const rulesTagsOptions = rulesTags =>
  !_.isNil(rulesTags)
    ? rulesTags.map((tag, i) => toOption({ i, v: tag, t: tag }))
    : [];

const to_type = (value, type) => {
  if (type == "integer") {
    return parseInt(value);
  } else if (type == "list") {
    return _.flow(
      _.split(","),
      _.map(_.trim)
    )(value);
  } else {
    return value;
  }
};

const formatTypeParam = (type, name, type_params) => {
  const value = _.get(name)(type_params);
  return to_type(value, type);
};

const isFieldEnabled = (non_editable_fields, rule_field_name) =>
  _.isNil(non_editable_fields) &&
  !_.some(f => f == rule_field_name)(non_editable_fields);

const TypeParam = ({ type_param, handleChange, rule, formatMessage }) => (
  <Form.Input
    name={type_param.name}
    fluid
    label={formatMessage({ id: `rule.${type_param.name}` })}
    value={rule.type_params[type_param.name]}
    onChange={handleChange}
    autoComplete="off"
    required
  />
);

TypeParam.propTypes = {
  type_param: PropTypes.object,
  rule: PropTypes.object,
  handleChange: PropTypes.func,
  formatMessage: PropTypes.func
};

const RuleTypeParamsForm = ({ params, rule, handleChange, formatMessage }) => {
  if (!params.type_params) return null;
  if (_.isEmpty(rule)) return null;
  return (
    <Form.Group widths="equal">
      {params.type_params.map(type_param => (
        <TypeParam
          key={type_param.name}
          type_param={type_param}
          handleChange={handleChange}
          value={_.pick(type_param.name)(rule.type_params)}
          formatMessage={formatMessage}
          rule={rule}
        />
      ))}
    </Form.Group>
  );
};

RuleTypeParamsForm.propTypes = {
  rule: PropTypes.object.isRequired,
  params: PropTypes.object,
  handleChange: PropTypes.func,
  formatMessage: PropTypes.func
};

export class RuleForm extends React.Component {
  static propTypes = {
    rule: PropTypes.object,
    history: PropTypes.object,
    isSubmitting: PropTypes.bool,
    rulesTags: PropTypes.array,
    ruleTypes: PropTypes.array,
    handleSubmit: PropTypes.func.isRequired,
    intl: PropTypes.object,
    params: PropTypes.object,
    business_concept_id: PropTypes.number,
    match: PropTypes.object
  };

  constructor(props) {
    super(props);
    const defaults = {
      name: "",
      description: "",
      rule_type_id: "",
      type_params: {},
      business_concept_id: "",
      goal: "",
      minimum: "",
      priority: "",
      weight: "",
      principle: "",
      active: false,
      tags: []
    };

    const rule = Object.assign(
      {},
      defaults,
      _.pickBy(value => !_.isNull(value))(props.rule)
    );
    const touched = false;
    const selectedType = {};
    const optionTags = [];

    this.state = { optionTags, rule, touched, selectedType };
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChangeTypeParams = this.handleChangeTypeParams.bind(this);
  }

  handleAddItem(event, data) {
    const { name, value } = data;

    if (name === "tags") {
      const { optionTags } = this.state;
      const { rulesTags } = this.props;
      this.setState({ optionTags: [value, ..._.union(optionTags, rulesTags)] });
    }

    event.preventDefault();
  }

  handleChange(event, data) {
    const { name, value, checked } = data;

    let rule;
    if (name === "principle") {
      rule = Object.assign({}, this.state.rule, {
        [name]: { name: value }
      });
    } else if (name === "tags") {
      rule = Object.assign({}, this.state.rule, {
        [name]: value
      });
    } else if (name === "type") {
      rule = Object.assign({}, this.state.rule, {
        rule_type_id: value
      });
    } else if (name === "active") {
      rule = Object.assign({}, this.state.rule, {
        [name]: checked
      });
    } else {
      rule = Object.assign({}, this.state.rule, {
        [name]: value
      });
    }

    if (name === "type") {
      this.selectRuleType(value, rule);
    } else {
      this.setState({ rule, touched: true });
    }

    event.preventDefault();
  }

  handleChangeTypeParams(event, data) {
    const { name, value } = data;
    const new_value = Object.assign({}, this.state.rule.type_params, {
      [name]: value
    });
    const rule = Object.assign({}, this.state.rule, {
      ["type_params"]: new_value
    });
    this.setState({ rule, touched: true });
    event.preventDefault();
  }

  componentDidMount() {
    const { ruleTypes, rule, business_concept_id } = this.props;

    if (rule && rule.rule_type_id) {
      const ruleType = ruleTypes.find(rt => rt.id == rule.rule_type_id);
      this.setState({ selectedType: ruleType, touched: true });
    }

    if (rule && !_.isEmpty(rule.tag)) {
      const tags = _.map(t => t.name)(_.get("tags")(rule.tag));
      this.setState({ rule: { ..._.omit(["tag"])(rule), ["tags"]: tags } });
    }

    if (business_concept_id && !rule) {
      const ruleTemp = Object.assign({}, this.state.rule, {
        ["business_concept_id"]: business_concept_id.toString(),
        ["active"]: false
      });
      this.setState({ rule: ruleTemp });
    }
  }

  selectRuleType(value, rule) {
    const { ruleTypes } = this.props;
    const ruleType = ruleTypes.find(rt => rt.id == value);
    this.setState({
      rule,
      selectedType: ruleType,
      touched: true
    });
  }

  handleSubmit(event) {
    const { selectedType } = this.state;
    const { non_editable_fields } = this.props;

    const rule = _.isNil(non_editable_fields)
      ? this.state.rule
      : _.omit(non_editable_fields)(this.state.rule);

    const types = _.isEmpty(selectedType)
      ? {}
      : selectedType.params.type_params;

    const type_params = _.reduce((acc, { type, name }) => {
      acc[name] = formatTypeParam(type, name, rule.type_params);
      return acc;
    }, {})(types);

    const tag = {
      tags: _.map(t => ({
        name: t
      }))(_.get("tags")(rule))
    };

    this.props.handleSubmit({
      rule: {
        ...rule,
        tag,
        type_params
      },
      ids: this.props.match.params
    });
    event.preventDefault();
  }

  handleCancel(event) {
    this.props.history.goBack();
    event.preventDefault();
  }

  render() {
    const {
      ruleTypes,
      isSubmitting,
      intl,
      rulesTags,
      non_editable_fields
    } = this.props;
    const { formatMessage } = intl;
    const { optionTags, rule, selectedType } = this.state;
    const dropDownOTags = !_.isEmpty(optionTags) ? optionTags : rulesTags;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          name="name"
          label={formatMessage({ id: "rule.props.name" })}
          onChange={this.handleChange}
          value={rule.name}
          placeholder={formatMessage({ id: "rule.props.name.placeholder" })}
          autoComplete="off"
          required
        />
        <Form.TextArea
          name="description"
          label={formatMessage({ id: "rule.props.description" })}
          onChange={this.handleChange}
          value={rule.description}
          placeholder={formatMessage({
            id: "rule.props.description.placeholder"
          })}
          autoComplete="off"
        />
        <Form.Input
          name="goal"
          label={formatMessage({ id: "rule.props.goal" })}
          onChange={this.handleChange}
          value={rule.goal}
          placeholder={formatMessage({
            id: "rule.props.goal.placeholder"
          })}
          autoComplete="off"
        />
        <Form.Input
          name="minimum"
          label={formatMessage({ id: "rule.props.minimum" })}
          onChange={this.handleChange}
          value={rule.minimum}
          placeholder={formatMessage({
            id: "rule.props.minimum.placeholder"
          })}
          autoComplete="off"
        />
        <Form.Dropdown
          name="tags"
          label={formatMessage({ id: "rule.props.tags" })}
          basic
          onChange={this.handleChange}
          onAddItem={this.handleAddItem}
          placeholder={formatMessage({ id: "rule.props.tags.placeholder" })}
          options={rulesTagsOptions(dropDownOTags)}
          value={rule.tags}
          search
          selection
          multiple
          allowAdditions
        />
        <Form.Dropdown
          name="principle"
          label={formatMessage({ id: "rule.props.principle" })}
          basic
          onChange={this.handleChange}
          value={rule.principle.name}
          placeholder={formatMessage({
            id: "rule.props.principle.placeholder"
          })}
          options={[
            {
              key: "1",
              text: formatMessage({
                id: "rule.props.principle.completeness"
              }),
              value: formatMessage({
                id: "rule.props.principle.completeness"
              })
            },
            {
              key: "2",
              text: formatMessage({ id: "rule.props.principle.validity" }),
              value: formatMessage({ id: "rule.props.principle.validity" })
            },
            {
              key: "3",
              text: formatMessage({ id: "rule.props.principle.integrity" }),
              value: formatMessage({ id: "rule.props.principle.integrity" })
            },
            {
              key: "4",
              text: formatMessage({
                id: "rule.props.principle.consistency"
              }),
              value: formatMessage({
                id: "rule.props.principle.consistency"
              })
            },
            {
              key: "5",
              text: formatMessage({
                id: "rule.props.principle.accessibility"
              }),
              value: formatMessage({
                id: "rule.props.principle.accessibility"
              })
            },
            {
              key: "6",
              text: formatMessage({ id: "rule.props.principle.precision" }),
              value: formatMessage({ id: "rule.props.principle.precision" })
            }
          ]}
          search
          selection
        />
        {isFieldEnabled(non_editable_fields, "rule_type_id") && (
          <Form.Dropdown
            name="type"
            label={formatMessage({ id: "rule.props.type" })}
            basic
            onChange={this.handleChange}
            value={rule.rule_type_id}
            placeholder={formatMessage({ id: "rule.props.type.placeholder" })}
            options={ruleTypesOptions(ruleTypes, formatMessage)}
            search
            selection
            allowAdditions
            onAddItem={this.handleAddItem}
          />
        )}
        {selectedType &&
          selectedType.params &&
          RuleTypeParamsForm({
            params: selectedType.params,
            rule,
            handleChange: this.handleChangeTypeParams,
            formatMessage
          })}
        <Form.Field>
          <Radio
            name="active"
            label={formatMessage({ id: "rule.props.active" })}
            checked={rule.active}
            toggle
            onChange={this.handleChange}
          />
        </Form.Field>
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
  ruleTypes: getRuleTypes(state),
  rulesTags: getRulesTags(state),
  isSubmitting: state.ruleCreating || state.ruleUpdating,
  business_concept_id:
    !_.isEmpty(state.concept) && _.has("business_concept_id")(state.concept)
      ? _.get("business_concept_id")(state.concept)
      : undefined
});

export default compose(
  withRouter,
  injectIntl,
  connect(mapStateToProps)
)(RuleForm);
