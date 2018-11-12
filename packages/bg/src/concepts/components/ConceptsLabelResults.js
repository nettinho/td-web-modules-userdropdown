import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Label } from "semantic-ui-react";

export const ConceptsLabelResults = ({
  intl: { formatMessage },
  conceptCount
}) => (
  <Label style={{ float: "right", margin: "10px" }}>
    {conceptCount}
    <Label.Detail>
      {formatMessage({ id: "concepts.retrieved.results" })}
    </Label.Detail>
  </Label>
);

ConceptsLabelResults.propTypes = {
  intl: PropTypes.object,
  conceptCount: PropTypes.number
};

const mapStateToProps = ({ conceptCount }) => ({ conceptCount });

export default compose(
  injectIntl,
  connect(mapStateToProps)
)(ConceptsLabelResults);
