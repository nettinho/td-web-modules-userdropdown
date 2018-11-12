import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header, Table, Segment, Icon } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import RoleRow from "./RoleRow";

export const Roles = ({ roles }) => (
  <React.Fragment>
    <Segment>
      <Header as="h2">
        <Icon circular name="student" />
        <Header.Content>
          <FormattedMessage id="roles.header" />
          <Header.Subheader>
            <FormattedMessage id="roles.subheader" />
          </Header.Subheader>
        </Header.Content>
      </Header>
      <Header as="h2">
        <FormattedMessage id="roles.header" />
      </Header>
      {roles && (
        <Table compact striped selectable>
          <Table.Body>
            {roles.map((r, i) => <RoleRow key={i} {...r} />)}
          </Table.Body>
        </Table>
      )}
    </Segment>
  </React.Fragment>
);

Roles.propTypes = {
  roles: PropTypes.array
};

const mapStateToProps = ({ roles }) => ({ roles });

export default connect(mapStateToProps)(Roles);
