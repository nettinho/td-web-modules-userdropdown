import React from "react";
import PropTypes from "prop-types";
import { Icon, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { linkTo } from "../routes";
import DomainActions from "./DomainActions";

const toActionPath = linkTo.DOMAIN_ACTION;

export const DomainDetail = ({ type, name, description }) => {
  const available_actions = {
    update: {
      order: 2,
      icon: "edit",
      messageId: "actions.edit",
      action: id => toActionPath({ action: "edit", id })
    },
    deleteOption: true
  };
  return (
    <div style={{ marginTop: "1em" }}>
      <DomainActions availableActions={available_actions} />
      <Header as="h2">
        <Icon name="cube" />
        <Header.Content>
          {name}
          <Header.Subheader>
            {type || <FormattedMessage id="domain" />}
          </Header.Subheader>
        </Header.Content>
      </Header>
      <p>{description}</p>
    </div>
  );
};

DomainDetail.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string
};

const mapStateToProps = ({ domain }) => ({ ...domain });

export default connect(mapStateToProps)(DomainDetail);
