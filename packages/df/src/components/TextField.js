import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

export const TextField = ({ label, name, required, value, onChange }) => (
  <Form.TextArea
    label={label}
    required={required}
    value={value}
    name={name}
    onChange={onChange}
  />
);

TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextField;
