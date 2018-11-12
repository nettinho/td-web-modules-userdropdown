import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Icon } from "semantic-ui-react";
import { injectIntl } from "react-intl";

export const PairListField = ({
  intl: { formatMessage },
  label,
  name,
  required,
  value,
  onChange
}) => {
  const handleAddUrl = e => {
    e && e.preventDefault();
    onChange(e, { name, value: [...value, { url_name: "", url_value: "" }] });
  };

  const handleRemoveUrl = (e, { id }) => {
    e && e.preventDefault();

    const newValue = [...value];
    newValue.splice(id, 1);
    onChange(e, { name, value: newValue });
  };

  const doOnChange = (e, data) => {
    const newValue = [...value];
    const idx = data.id;
    newValue[idx] = { ...newValue[idx], [data.name]: data.value };
    onChange(e, { name, value: newValue });
  };

  return (
    <Form.Field required={required}>
      <label>{label}</label>
      {value.map((v, i) => (
        <Form.Group widths="equal" key={i}>
          <Form.Input
            id={i}
            required={required}
            value={v.url_name}
            name="url_name"
            onChange={doOnChange}
            placeholder={formatMessage({
              id: "fields.pairlist.url.name.placeholder"
            })}
          />
          <Form.Input
            id={i}
            required={required}
            value={v.url_value}
            name="url_value"
            onChange={doOnChange}
            placeholder={formatMessage({
              id: "fields.pairlist.url.value.placeholder"
            })}
          />
          <Button
            name="delete_buttom"
            compact
            className="no_background"
            onClick={e => handleRemoveUrl(e, i)}
          >
            <Icon name="minus" />
          </Button>
        </Form.Group>
      ))}
      <Button
        name="add_buttom"
        compact
        className="no_background"
        onClick={handleAddUrl}
      >
        <Icon name="add" color="green" />
      </Button>
    </Form.Field>
  );
};

PairListField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  handleAddUrl: PropTypes.func,
  handleRemoveUrl: PropTypes.func
};

export default injectIntl(PairListField);
