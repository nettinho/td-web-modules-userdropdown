import React from "react";
import { Card, Icon, Button, Popup } from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ConfirmModal } from "@truedat/core/components";
import { compose } from "redux";
import { injectIntl } from "react-intl";
import { deleteDomainMember } from "../routines";

const memberTypeToIcon = {
  group: "users",
  user: "user"
};

const memberTypeToPopup = {
  group: "Group",
  user: "User"
};

const retrieveNameFromMember = (principal_type, principal) => {
  switch (principal_type) {
    case "group":
      return principal.name;
    case "user":
      return principal.user_name;
  }
};

export const DomainMember = ({
  role_name,
  principal,
  principal_type,
  acl_entry_id,
  _actions,
  deleteDomainMember,
  domainMemberDeleting,
  intl: { formatMessage }
}) => {
  const memberName = retrieveNameFromMember(principal_type, principal);
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Popup
            key={role_name}
            trigger={<Icon name={memberTypeToIcon[principal_type]} />}
            content={memberTypeToPopup[principal_type]}
          />
          {memberName}
        </Card.Header>
        <Card.Meta>
          <Icon name="student" /> {role_name}
        </Card.Meta>
      </Card.Content>
      {_actions &&
        _actions.delete && (
          <Card.Content extra>
            <ConfirmModal
              style={{ marginTop: "200px", marginLeft: "200px" }}
              header={formatMessage({ id: "domain.members.delete" })}
              content={formatMessage({ id: "domain.members.delete.question" })}
              handleSubmit={() => deleteDomainMember({ id: acl_entry_id })}
              trigger={
                <Button
                  basic
                  floated="right"
                  icon="trash"
                  negative
                  loading={domainMemberDeleting.includes(acl_entry_id)}
                />
              }
            />
          </Card.Content>
        )}
    </Card>
  );
};

DomainMember.propTypes = {
  _actions: PropTypes.object,
  acl_entry_id: PropTypes.number,
  deleteDomainMember: PropTypes.func.isRequired,
  domainMemberDeleting: PropTypes.array,
  intl: PropTypes.object,
  principal_type: PropTypes.string,
  principal: PropTypes.object,
  role_name: PropTypes.string
};

const mapStateToProps = ({ domainMemberDeleting }) => ({
  domainMemberDeleting
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ deleteDomainMember }, dispatch)
});

export default compose(
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DomainMember);
