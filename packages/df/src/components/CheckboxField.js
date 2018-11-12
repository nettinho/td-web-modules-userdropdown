import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

export const CheckboxField = ({ label, name, value, disabled, onChange }) => (
  <Form.Field>
    <Form.Checkbox
      name={name}
      label={label}
      checked={value == "Si"}
      onChange={(e, data) => {
        const { checked } = data;
        const value = checked ? "Si" : "No";
        onChange(e, { ...data, value });
      }}
      disabled={disabled}
    />
  </Form.Field>
);

CheckboxField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

export default CheckboxField;
