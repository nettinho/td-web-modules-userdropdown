import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { Divider, Icon, Label, List, Button } from "semantic-ui-react";

const FieldDetail = ({ value, type, widget }) => {
  switch (type) {
    case "variable_list":
      return !_.isEmpty(value) ? (
        value.map((v, i) => <Label key={i}>{v}</Label>)
      ) : (
        <Icon name="ellipsis vertical" color="grey" />
      );
    case "map_list":
      return !_.isEmpty(value) ? (
        widget == "user_dropdown" ? value.full_name || "-" :
        Object.keys(value).map((v, i) => <Label key={i}>{v}: {value[v]}</Label>)
      ) : (
        <Icon name="ellipsis vertical" color="grey" />
      );
    case "variable_map_list":
      return !_.isEmpty(value) ? (
        value.map((v, i) => (
          <Button key={i} compact href={v.url_value} target="_blank">
            {v.url_name}
          </Button>
        ))
      ) : (
        <Icon name="ellipsis vertical" color="grey" />
      );
    default:
      return value || <Icon name="ellipsis vertical" color="grey" />;
  }
};

FieldDetail.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object])
};

const CheckboxValue = ({ field, value }) => {
  if (value != "Si") return null;
  return (
    <List.Item>
      <List.Header>{field}</List.Header>
    </List.Item>
  );
};

CheckboxValue.propTypes = {
  field: PropTypes.string,
  type: PropTypes.string
};

const FieldValue = ({ field, value, type, widget }) => (
  <List.Item>
    <List.Header>{field}</List.Header>
    <List.Description>
      <FieldDetail value={value} type={type} widget={widget} />
    </List.Description>
  </List.Item>
);

FieldValue.propTypes = {
  field: PropTypes.string,
  type: PropTypes.string,
  widget: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object])
};

const DynamicFieldValue = f => {
  const { widget } = f;
  if (widget && widget == "checkbox") return <CheckboxValue {...f} />;
  return <FieldValue {...f} />;
};

DynamicFieldValue.propTypes = {
  props: PropTypes.object
};

export const FieldGroupDetail = ({ groupName, fieldValues }) => (
  <React.Fragment>
    {groupName &&
      groupName !== "undefined" && (
        <Divider horizontal>
          <h3>{groupName}</h3>
        </Divider>
      )}
    <List size="big" relaxed="very">
      {fieldValues
        .filter(f => !f.hidden)
        .map((f, i) => <DynamicFieldValue key={i} {...f} />)}
    </List>
  </React.Fragment>
);

export default FieldGroupDetail;
