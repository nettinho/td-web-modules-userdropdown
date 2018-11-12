import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Label, Header, Icon, Breadcrumb, Segment, Checkbox } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FormattedMessage} from "react-intl";
import { FormattedMessageFixed } from "@truedat/core/components";
import { deleteRole, updateRole } from "../routines";
import routes from "../routes";
import PermissionGroup from "./PermissionGroup";

export const Role = ({ id, name, is_default,  permissionGroups, updateRole }) =>
  id && permissionGroups ? (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Section as={Link} to={routes.ROLES} active={false}>
          <FormattedMessage id="navigation.admin.roles" />
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right angle" />
        <Breadcrumb.Section active>{name}</Breadcrumb.Section>
      </Breadcrumb>
      <Segment>
        <Header as="h2">
          <Icon name="student" />
          <Header.Content>
            {name}
            <Header.Subheader>
              <FormattedMessage id="role.subheader" />
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Checkbox
          label={{ children: <FormattedMessage id="roles.default" /> }}
          checked={ is_default }
          onChange={(e, data) => {
            updateRole({ id, role: {is_default: !is_default} });
            e.preventDefault();
          }}
        />
        {permissionGroups.map(([pg, perms], i) => (
          <PermissionGroup
            key={i}
            roleId={id}
            name={pg}
            permissions={_.sortBy("name")(perms)}
          />
        ))}
        {/* <Button onClick={() => deleteRole({ id })} icon="trash" /> */}
      </Segment>
    </React.Fragment>
  ) : null;

Role.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  is_default: PropTypes.bool,
  permissionGroups: PropTypes.array,
  updateRole: PropTypes.func
};

const groups = [
  { pattern: "acl_entry", name: "Taxonomy Membership" },
  { pattern: "domain", name: "Taxonomy Structure" },
  { pattern: "business_concept", name: "Business Glossary" },
  { pattern: "data_structure", name: "Data Dictionary" },
  { pattern: "quality_rule", name: "Quality Rule" }
];

const groupContains = permissionName => g =>
  _.includes(g.pattern)(permissionName);

const getPermissionGroup = perm =>
  _.flow(
    _.find(groupContains(_.get("name")(perm))),
    _.get("name")
  )(groups);

const mapStateToProps = ({ role, permissions }) => ({
  ...role,
  permissionGroups: _.flow(
    _.groupBy(getPermissionGroup),
    _.toPairs
  )(permissions)
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ deleteRole, updateRole }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Role);
