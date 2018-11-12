import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { compose } from "redux";
import { Header, List, Checkbox, Segment } from "semantic-ui-react";
import { injectIntl } from "react-intl";
import { updateRolePermissions } from "../routines";

export const PermissionGroup = ({
  name,
  permissions,
  rolePermissions,
  roleId,
  updateRolePermissions,
  intl: { formatMessage }
}) => (
  <Segment>
    <Header as="h4" content={name} />
    <List size="small">
      {permissions.map((p, i) => (
        <List.Item key={i}>
          <Checkbox
            label={{ children: formatMessage({ id: `permission.${p.name}` }) }}
            checked={_.find(_.propEq("id", p.id))(rolePermissions) && true}
            onChange={(e, data) => {
              const nextRolePermissions = data.checked
                ? _.concat(p)(rolePermissions)
                : _.filter(_.negate(_.propEq("id", p.id)))(rolePermissions);
              updateRolePermissions({
                id: roleId,
                permissions: nextRolePermissions
              });
              e.preventDefault();
            }}
          />
        </List.Item>
      ))}
    </List>
  </Segment>
);

PermissionGroup.propTypes = {
  roleId: PropTypes.number,
  intl: PropTypes.object,
  name: PropTypes.string,
  permissions: PropTypes.array,
  rolePermissions: PropTypes.array,
  updateRolePermissions: PropTypes.func
};

const mapStateToProps = ({ role, rolePermissions }) => ({
  roleId: _.get("id")(role),
  rolePermissions
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateRolePermissions }, dispatch)
});

export default compose(
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PermissionGroup);
