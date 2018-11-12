import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

export const StringField = ({ label, name, required, value, onChange }) => (
  <Form.Input
    label={label}
    required={required}
    value={value}
    name={name}
    onChange={onChange}
  />
);

StringField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default StringField;
