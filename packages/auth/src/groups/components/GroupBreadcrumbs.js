import React from "react";
import { Breadcrumb } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import routes from "../routes";

export const GroupBreadcrumbs = ({ name }) => (
  <Breadcrumb>
    <Breadcrumb.Section as={Link} to={routes.GROUP_LIST} active={false}>
      <FormattedMessage id="navigation.admin.groups" />
    </Breadcrumb.Section>
    <Breadcrumb.Divider icon="right angle" />
    <Breadcrumb.Section active>
      <FormattedMessage id={name} />
    </Breadcrumb.Section>
  </Breadcrumb>
);

export default GroupBreadcrumbs;
