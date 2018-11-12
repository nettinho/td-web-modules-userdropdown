import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import routes from "../routes";

export const UserBreadcrumbs = ({ name }) => (
  <Breadcrumb>
    <Breadcrumb.Section as={Link} to={routes.USER_LIST} active={false}>
      <FormattedMessage id="navigation.admin.users" />
    </Breadcrumb.Section>
    <Breadcrumb.Divider icon="right angle" />
    <Breadcrumb.Section active>{name}</Breadcrumb.Section>
  </Breadcrumb>
);

UserBreadcrumbs.propTypes = {
  name: PropTypes.string
};

export default UserBreadcrumbs;
