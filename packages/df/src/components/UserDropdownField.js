import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import { injectIntl } from "react-intl";
import _ from "lodash/fp";

export const UserDropdownField = ({
  intl: { formatMessage },
  label,
  name,
  required,
  values,
  value,
  onChange,
  type
}) => {
  
  const onChangeDropdown = (e, { name, value }) => {
    value = _.find({ user_name: value })(values)
    onChange(e, {name, value})
  };
  return (<Form.Field required={required}>
    <label>{label}</label>
    <Form.Dropdown
      fluid
      search
      selection
      placeholder={formatMessage({ id: "fields.dropdown.placeholder" })}
      onChange={onChangeDropdown}
      name={name}
      value={value ? value.user_name : ""}
      options={["", ...values].map((o, i) => ({
        key: i,
        value: o ? o.user_name : "",
        text: o ? o.full_name : ""
      }))}
    />
  </Form.Field>)
}

UserDropdownField.propTypes = {
  intl: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  values: PropTypes.array,
  value: PropTypes.object,
  onChange: PropTypes.func
};

export default injectIntl(UserDropdownField);
