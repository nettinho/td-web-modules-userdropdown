import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";
import { injectIntl } from "react-intl";
import { getDomainConceptsOptions } from "../selectors";

export const ParentConceptSelector = ({
  intl: { formatMessage },
  onChange,
  onSearchChange,
  domainConceptOptions,
  domainConceptsLoading,
  value
}) => (
  <Form.Dropdown
    label={formatMessage({ id: "parentConcept.selector.label" })}
    placeholder={formatMessage({ id: "parentConcept.selector.placeholder" })}
    name="parent"
    value={value}
    search
    selection
    onSearchChange={onSearchChange}
    options={[
      {
        text: formatMessage({ id: "parentConcept.selector.no.selection" }),
        value: null
      },
      ...domainConceptOptions
    ]}
    loading={domainConceptsLoading}
    onChange={onChange}
  />
);

ParentConceptSelector.propTypes = {
  intl: PropTypes.object,
  onChange: PropTypes.func,
  onSearchChange: PropTypes.func,
  domainConceptOptions: PropTypes.array,
  domainConceptsLoading: PropTypes.bool,
  value: PropTypes.number
};

const mapStateToProps = state => ({
  domainConceptsLoading: state.domainConceptsLoading,
  domainConceptOptions: getDomainConceptsOptions(state)
});

export default compose(
  injectIntl,
  connect(mapStateToProps)
)(ParentConceptSelector);
