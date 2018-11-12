import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import { injectIntl } from "react-intl";

export const DropdownField = ({
  intl: { formatMessage },
  label,
  name,
  required,
  values = [""],
  value,
  onChange,
  type
}) => (
  <Form.Field required={required}>
    <label>{label}</label>
    <Form.Dropdown
      fluid
      search
      selection
      placeholder={formatMessage({ id: "fields.dropdown.placeholder" })}
      onChange={onChange}
      name={name}
      value={value}
      multiple={type === "variable_list"}
      options={["", ...values].map((o, i) => ({
        key: i,
        value: o,
        text: o
      }))}
    />
  </Form.Field>
);

DropdownField.propTypes = {
  intl: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  values: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func
};

export default injectIntl(DropdownField);
