import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Table } from "semantic-ui-react";

export const UserGroupAclRow = ({ resource, role, group }) => (
  <Table.Row>
    <Table.Cell content={resource} />
    <Table.Cell content={group} />
    <Table.Cell content={role} />
  </Table.Row>
);

UserGroupAclRow.propTypes = {
  resource: PropTypes.string,
  role: PropTypes.string,
  group: PropTypes.string
};

export default withRouter(UserGroupAclRow);
