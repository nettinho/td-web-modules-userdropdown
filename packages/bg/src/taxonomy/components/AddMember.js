import React, { Fragment } from "react";
import { Container, Header, Icon, Segment } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import AddMemberForm from "./AddMemberForm";
import DomainCrumbs from "./DomainCrumbs";

export const AddMember = () => (
  <Fragment>
    <DomainCrumbs />
    <Container as={Segment} text>
      <Header as="h2">
        <Icon name="id card outline" />
        <Header.Content>
          <FormattedMessage id="domain.actions.add_member" />
        </Header.Content>
      </Header>
      <AddMemberForm />
    </Container>
  </Fragment>
);

export default AddMember;
