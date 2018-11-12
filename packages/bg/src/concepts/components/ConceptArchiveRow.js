import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Table } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { DateTime } from "@truedat/core/components";
import { linkTo } from "../routes";

// as={Link} to={linkTo.CONCEPT({ id })}

export const ConceptArchiveRow = ({
  id,
  status,
  last_change_at,
  last_change_by,
  version,
  history
}) => (
  <Table.Row
    onClick={() => history.push(linkTo.CONCEPT({ id }))}
    className="selectable_row"
  >
    <Table.Cell
      content={<FormattedMessage id={`concepts.status.${status}`} />}
    />
    <Table.Cell content={version} />
    <Table.Cell content={last_change_by} />
    <Table.Cell content={<DateTime value={last_change_at} />} />
  </Table.Row>
);

ConceptArchiveRow.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  last_change_at: PropTypes.string,
  last_change_by: PropTypes.string,
  version: PropTypes.number,
  history: PropTypes.object
};

export default compose(
  withRouter,
  connect(
    null,
    null
  )
)(ConceptArchiveRow);
