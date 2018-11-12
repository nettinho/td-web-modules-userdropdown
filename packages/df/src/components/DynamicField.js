import React from "react";
import PropTypes from "prop-types";
import DropdownField from "./DropdownField";
import UserDropdownField from "./UserDropdownField";
import CheckboxField from "./CheckboxField";
import RadioField from "./RadioField";
import StringField from "./StringField";
import MultipleStringField from "./MultipleStringField";
import TextField from "./TextField";
import ColorPickerField from "./ColorPickerField";
import PairListField from "./PairListField";

export const DynamicField = ({ widget, form_type, ...fieldProps }) => {
  switch (widget || form_type) {
    case "checkbox":
      return <CheckboxField {...fieldProps} />;
    case "radio":
      return <RadioField {...fieldProps} />;
    case "dropdown":
      return <DropdownField {...fieldProps} />;
    case "user_dropdown":
      return <UserDropdownField {...fieldProps} />;
    case "textarea":
      return <TextField {...fieldProps} />;
    case "color_picker":
      return <ColorPickerField {...fieldProps} />;
    case "multiple_input":
      return <MultipleStringField {...fieldProps} />;
    case "pair_list":
      return <PairListField {...fieldProps} />;
    default:
      return <StringField {...fieldProps} />;
  }
};

DynamicField.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default DynamicField;
