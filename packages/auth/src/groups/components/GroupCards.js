import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon, Card } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import routes from "../routes";
import GroupCard from "./GroupCard";

export const GroupCards = ({ groups }) => (
  <Card.Group>
    <Card href={routes.GROUP_CREATE}>
      <Card.Content textAlign="center">
        <Card.Header>
          <FormattedMessage id="groups.actions.create" />
        </Card.Header>
        <Card.Description>
          <Icon floated="center" name="add" size="massive" />
        </Card.Description>
      </Card.Content>
    </Card>
    {groups.map((group, i) => <GroupCard key={i} group={group} />)}
  </Card.Group>
);

GroupCards.propTypes = {
  groups: PropTypes.array
};

const mapStateToProps = ({ groups }) => ({ groups });

export default connect(mapStateToProps)(GroupCards);
