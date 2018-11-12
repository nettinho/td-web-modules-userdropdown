import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { Button, Form } from "semantic-ui-react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { injectIntl } from "react-intl";
import { getDomainTypes } from "../selectors";

const toOption = (t, i) => ({ key: i, text: t, value: t });

const domainTypeOptions = (domainTypes, value) =>
  _.flow(
    _.concat(""),
    _.concat(value),
    _.filter(_.isString),
    _.uniq,
    _.sortBy(_.lowerCase),
    _.map.convert({ cap: false })(toOption)
  )(domainTypes);

export class DomainForm extends React.Component {
  static propTypes = {
    domain: PropTypes.object,
    history: PropTypes.object,
    isSubmitting: PropTypes.bool,
    domainTypes: PropTypes.array,
    handleSubmit: PropTypes.func.isRequired,
    intl: PropTypes.object
  };

  constructor(props) {
    super(props);
    const defaults = { name: "", description: "", type: "", parent_id: null };
    const domain = Object.assign({}, defaults, props.domain);
    const touched = false;
    this.state = { domain, touched };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(event, data) {
    const { name, value } = data;
    const domain = Object.assign({}, this.state.domain, { [name]: value });
    this.setState({ domain, touched: true });
    event.preventDefault();
  }

  handleSubmit(event) {
    const { domain } = this.state;
    this.props.handleSubmit({ domain });
    event.preventDefault();
  }

  handleCancel(event) {
    this.props.history.goBack();
    event.preventDefault();
  }

  render() {
    const { isSubmitting, domainTypes, intl } = this.props;
    const { formatMessage } = intl;
    const { domain } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          name="name"
          label={formatMessage({ id: "domain.props.name" })}
          onChange={this.handleChange}
          value={domain.name}
          placeholder={formatMessage({ id: "domain.props.name.placeholder" })}
          autoComplete="off"
          required
        />
        <Form.Dropdown
          name="type"
          label={formatMessage({ id: "domain.props.type" })}
          basic
          onChange={this.handleChange}
          value={domain.type}
          placeholder={formatMessage({ id: "domain.props.type.placeholder" })}
          options={domainTypeOptions(domainTypes, domain.type)}
          search
          selection
          allowAdditions
          onAddItem={this.handleAddItem}
          additionLabel={<i style={{ color: "red" }}>New Domain Type: </i>}
        />
        <Form.TextArea
          name="description"
          label={formatMessage({ id: "domain.props.description" })}
          onChange={this.handleChange}
          value={domain.description}
          placeholder={formatMessage({
            id: "domain.props.description.placeholder"
          })}
          autoComplete="off"
          required
        />
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
  domainTypes: getDomainTypes(state),
  isSubmitting: state.domainCreating || state.domainUpdating
});

export default compose(
  withRouter,
  injectIntl,
  connect(mapStateToProps)
)(DomainForm);
