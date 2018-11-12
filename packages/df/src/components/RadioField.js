import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

export const RadioField = ({
  label,
  name,
  required,
  values,
  value,
  onChange
}) => (
  <Form.Field required={required}>
    <label>{label}</label>
    {values.map((o, i) => (
      <Form.Radio
        name={name}
        key={i}
        label={o}
        value={o}
        checked={value === o}
        onChange={onChange}
      />
    ))}
  </Form.Field>
);

RadioField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  values: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default RadioField;
