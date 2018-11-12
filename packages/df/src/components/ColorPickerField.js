import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import { GithubPicker } from "react-color";

export const ColorPickerField = ({
  label,
  name,
  required,
  value,
  onChange
}) => (
  <Form.Field required={required}>
    <label>{label}</label>
    <GithubPicker
      name="color_picker"
      value={value}
      onChangeComplete={color => {
        onChange(null, { name, value: color.hex });
      }}
    />
  </Form.Field>
);

ColorPickerField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default ColorPickerField;
