import React from "react";
import { Icon, Card } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import routes from "../routes";
import UserCard from "./UserCard";

export const UserCards = ({ users }) => (
  <Card.Group>
    <Card href={routes.USER_CREATE}>
      <Card.Content textAlign="center">
        <Card.Header>
          <FormattedMessage id="users.actions.create" />
        </Card.Header>
        <Card.Description>
          <Icon floated="center" name="add user" size="massive" />
        </Card.Description>
      </Card.Content>
    </Card>
    {users.map((user, i) => <UserCard key={i} user={user} />)}
  </Card.Group>
);

UserCards.propTypes = {
  users: PropTypes.array
};

const mapStateToProps = ({ users }) => ({ users });

export default connect(mapStateToProps)(UserCards);
