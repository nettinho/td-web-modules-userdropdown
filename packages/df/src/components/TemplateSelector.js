import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";
import { injectIntl } from "react-intl";

export const TemplateSelector = ({
  intl: { formatMessage },
  onChange,
  templateOptions,
  domainTemplatesLoading,
  selectedValue
}) => (
  <Form.Dropdown
    label={formatMessage({ id: "domainTemplate.selector.label" })}
    placeholder={formatMessage({ id: "domainTemplate.selector.placeholder" })}
    name="template"
    search
    selection
    required
    options={templateOptions}
    loading={domainTemplatesLoading}
    onChange={onChange}
    value={selectedValue}
  />
);

TemplateSelector.propTypes = {
  intl: PropTypes.object,
  onChange: PropTypes.func,
  templateOptions: PropTypes.array,
  domainTemplatesLoading: PropTypes.bool,
  selectedValue: PropTypes.number
};

const mapStateToProps = ({ domainTemplates, domainTemplatesLoading }) => {
  return {
    domainTemplatesLoading,
    templateOptions: domainTemplates.map(
      ({ label, name, is_default, id, content }, i) => ({
        key: i,
        value: id,
        text: label
      })
    )
  };
};

export default compose(
  injectIntl,
  connect(mapStateToProps)
)(TemplateSelector);
