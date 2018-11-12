import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { getUserGroupAcls } from "../selectors";
import UserGroupAclRow from "./UserGroupAclRow";

export const UserGroupAcls = ({ acls }) =>
  !_.isEmpty(acls) && (
    <React.Fragment>
      <FormattedMessage i id="user.group.acl" />
      <Table celled striped compact selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              content={<FormattedMessage id="user.acl.domain" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="user.acl.group" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="user.acl.role" />}
            />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {acls.map((a, i) => <UserGroupAclRow key={i} {...a} />)}
        </Table.Body>
      </Table>
    </React.Fragment>
  );

UserGroupAcls.propTypes = {
  acls: PropTypes.array
};

const mapStateToProps = state => ({
  acls: getUserGroupAcls(state)
});

export default connect(
  mapStateToProps,
  null
)(UserGroupAcls);
