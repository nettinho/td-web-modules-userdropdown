import React, { Fragment } from "react";
import { Header, Icon, Segment } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import LineageForm from "./LineageForm";

const Lineage = () => {
  return (
    <Fragment>
      <Segment>
        <Header as="h2">
          <Icon name="share alternate" circular />
          <Header.Content>
            <FormattedMessage id="navigation.lineage" />
            <Header.Subheader>
              <FormattedMessage id="navigation.lineage.subheader" />
            </Header.Subheader>
          </Header.Content>
        </Header>
        <LineageForm />
      </Segment>
    </Fragment>
  );
};

export default Lineage;
