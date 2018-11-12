import React from "react";
import PropTypes from "prop-types";
import pathToRegexp from "path-to-regexp";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Icon, Button, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { ConfirmModal } from "@truedat/core/components";
import routes from "../routes";
import { deleteUser } from "../routines";

const toEditPath = pathToRegexp.compile(routes.USER_EDIT);
const toDetailPath = pathToRegexp.compile(routes.USER);

export const UserCard = ({
  user: { user_name, is_admin, id, full_name, email },
  deleteUser
}) => (
  <Card key={id}>
    <Card.Content>
      <Card.Header as={Link} to={toDetailPath({ id })}>
        <Icon name="user" /> {user_name}
      </Card.Header>
      <Card.Meta>
        {is_admin ? (
          <FormattedMessage id="user.type.admin" />
        ) : (
          <FormattedMessage id="user.type.user" />
        )}
      </Card.Meta>
      <Card.Description>
        {full_name}
        <br />
        {email}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div className="ui two buttons">
        <Button
          basic
          color="green"
          as={Link}
          to={toEditPath({ id })}
          content={<FormattedMessage id="actions.edit" />}
        />
        <ConfirmModal
          icon="trash"
          trigger={
            <Button
              basic
              color="red"
              content={<FormattedMessage id="actions.delete" />}
            />
          }
          header={
            <FormattedMessage id="user.actions.delete.confirmation.header" />
          }
          size="small"
          content={
            <FormattedMessage
              id="user.actions.delete.confirmation.content"
              values={{ name: <i>{user_name}</i> }}
            />
          }
          handleSubmit={() => deleteUser({ id })}
        />
      </div>
    </Card.Content>
  </Card>
);

UserCard.propTypes = {
  user: PropTypes.object,
  deleteUser: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ deleteUser }, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(UserCard);
