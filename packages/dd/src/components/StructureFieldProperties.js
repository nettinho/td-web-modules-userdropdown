import React from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";
import { compose } from "redux";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

export const StructureFieldProperties = ({
  intl: { formatMessage },
  type,
  nullable,
  precision
}) => (
  <List>
    {type && <List.Item icon="font" content={type} />}
    {nullable !== undefined && (
      <List.Item
        icon="minus"
        content={
          nullable
            ? formatMessage({ id: "structure.field.optional" })
            : formatMessage({ id: "structure.field.required" })
        }
      />
    )}
    {precision && <List.Item icon="quote right" content={precision} />}
  </List>
);

StructureFieldProperties.propTypes = {
  intl: PropTypes.object,
  type: PropTypes.string,
  nullable: PropTypes.bool,
  precision: PropTypes.string
};

const mapStateToProps = ({ structureField }) => ({
  ...structureField
});

export default compose(
  injectIntl,
  connect(mapStateToProps)
)(StructureFieldProperties);
