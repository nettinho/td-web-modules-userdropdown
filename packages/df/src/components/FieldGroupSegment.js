import React from "react";
import PropTypes from "prop-types";
import { Segment, Header } from "semantic-ui-react";
import DynamicField from "./DynamicField";

export const FieldGroupSegment = ({
  onFieldChange,
  handleAddUrl,
  handleRemoveUrl,
  name,
  fields,
  content
}) => (
  <Segment>
    {name !== "undefined" && <Header as="h4" content={name} />}
    {fields &&
      fields
        .filter(
          field =>
            !("depends" in field) ||
            content[field.depends.on] == field.depends.to_be
        )
        .map((field, i) => (
          <DynamicField
            key={i}
            onChange={onFieldChange}
            handleAddUrl={handleAddUrl}
            handleRemoveUrl={handleRemoveUrl}
            {...field}
          />
        ))}
  </Segment>
);

FieldGroupSegment.propTypes = {
  onFieldChange: PropTypes.func,
  handleAddUrl: PropTypes.func,
  handleRemoveUrl: PropTypes.func,
  name: PropTypes.string,
  fields: PropTypes.array
};

export default FieldGroupSegment;
