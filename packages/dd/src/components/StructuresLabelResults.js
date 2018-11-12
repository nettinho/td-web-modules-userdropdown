import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Label } from "semantic-ui-react";

export const StructuresLabelResults = ({
  intl: { formatMessage },
  structureCount
}) => (
  <Label style={{ float: "right", margin: "10px" }}>
    {structureCount}
    <Label.Detail>
      {formatMessage({ id: "structures.retrieved.results" })}
    </Label.Detail>
  </Label>
);

StructuresLabelResults.propTypes = {
  intl: PropTypes.object,
  structureCount: PropTypes.number
};

const mapStateToProps = ({ structureCount }) => ({ structureCount });

export default compose(
  injectIntl,
  connect(mapStateToProps)
)(StructuresLabelResults);
