import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";
import { injectIntl } from "react-intl";

export const DomainSelector = ({
  intl: { formatMessage },
  onChange,
  domainOptions,
  domainsLoading
}) => (
  <Form.Dropdown
    label={formatMessage({ id: "domain.selector.label" })}
    placeholder={formatMessage({ id: "domain.selector.placeholder" })}
    name="domain"
    search
    selection
    required
    options={domainOptions}
    loading={domainsLoading}
    onChange={onChange}
  />
);

DomainSelector.propTypes = {
  intl: PropTypes.object,
  onChange: PropTypes.func,
  domainOptions: PropTypes.array,
  domainsLoading: PropTypes.bool
};

const mapStateToProps = ({ domains, domainsLoading }) => ({
  domainsLoading,
  domainOptions: domains.map(({ name, id }, i) => ({
    key: i,
    value: id,
    text: name
  }))
});

export default compose(
  injectIntl,
  connect(mapStateToProps)
)(DomainSelector);
