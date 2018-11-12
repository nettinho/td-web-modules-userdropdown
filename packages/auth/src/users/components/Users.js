import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Header, Icon, Segment } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import GroupCards from "../../groups/components/GroupCards";
import groupRoutes from "../../groups/routes";
import routes from "../routes";
import UserCards from "./UserCards";
import UserTabs from "./UserTabs";

const Users = () => (
  <Fragment>
    <Segment>
      <Header as="h2">
        <Icon name="users" circular />
        <Header.Content>
          <FormattedMessage id="users.header" />
          <Header.Subheader>
            <FormattedMessage id="users.subheader" />
          </Header.Subheader>
        </Header.Content>
      </Header>
      <UserTabs />
      <Segment attached="bottom">
        <Switch>
          <Route path={routes.USER_LIST} component={UserCards} exact />
          <Route path={groupRoutes.GROUP_LIST} component={GroupCards} exact />
        </Switch>
      </Segment>
    </Segment>
  </Fragment>
);

const mapStateToProps = ({ usersLoading }) => ({ usersLoading });

export default connect(mapStateToProps)(Users);
