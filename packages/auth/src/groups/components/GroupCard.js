import React from "react";
import PropTypes from "prop-types";
import pathToRegexp from "path-to-regexp";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { ConfirmModal } from "@truedat/core/components";
import { deleteGroup } from "../routines";
import routes from "../routes";

const toEditPath = pathToRegexp.compile(routes.GROUP_EDIT);

export const GroupCard = ({
  group: { name, description, id },
  deleteGroup
}) => (
  <Card key={id}>
    <Card.Content>
      <Card.Header>
        <Icon name="group" /> {name}
      </Card.Header>
      <Card.Description>{description}</Card.Description>
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
              negative
              content={<FormattedMessage id="actions.delete" />}
            />
          }
          header={
            <FormattedMessage id="group.actions.delete.confirmation.header" />
          }
          content={
            <FormattedMessage
              id="group.actions.delete.confirmation.content"
              values={{ name: <i>{name}</i> }}
            />
          }
          handleSubmit={() => deleteGroup({ id })}
        />
      </div>
    </Card.Content>
  </Card>
);

GroupCard.propTypes = {
  group: PropTypes.object,
  deleteGroup: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ deleteGroup }, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(GroupCard);
