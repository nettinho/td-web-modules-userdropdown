import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Table } from "semantic-ui-react";

export const UserAclRow = ({ resource, role }) => (
  <Table.Row>
    <Table.Cell content={resource} />
    <Table.Cell content={role} />
  </Table.Row>
);

UserAclRow.propTypes = {
  resource: PropTypes.string,
  role: PropTypes.string
};

export default withRouter(UserAclRow);
