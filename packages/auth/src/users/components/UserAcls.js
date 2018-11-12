import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { getUserAcls } from "../selectors";
import UserAclRow from "./UserAclRow";

export const UserAcls = ({ acls }) =>
  !_.isEmpty(acls) && (
    <React.Fragment>
      <FormattedMessage i id="user.acl" />
      <Table celled striped compact selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              content={<FormattedMessage id="user.acl.domain" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="user.acl.role" />}
            />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {acls.map((a, i) => <UserAclRow key={i} {...a} />)}
        </Table.Body>
      </Table>
    </React.Fragment>
  );

UserAcls.propTypes = {
  acls: PropTypes.array
};

const mapStateToProps = state => ({
  acls: getUserAcls(state)
});

export default connect(
  mapStateToProps,
  null
)(UserAcls);
