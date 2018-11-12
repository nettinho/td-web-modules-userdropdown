import _ from "lodash/fp";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Header, Icon, Segment } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { createDomain } from "../routines";
import DomainForm from "./DomainForm";
import DomainCrumbs from "./DomainCrumbs";

export const NewDomain = ({ domain, createDomain }) => (
  <Fragment>
    <DomainCrumbs actionCrumb="domains.actions.create" />
    <Container as={Segment} text>
      <Header as="h2">
        <Icon name="cube" />
        <Header.Content>
          {!_.isEmpty(domain) && (
            <FormattedMessage id="domain.actions.create" />
          )}
          {_.isEmpty(domain) && (
            <FormattedMessage id="domains.actions.create" />
          )}
        </Header.Content>
      </Header>
      <DomainForm
        handleSubmit={createDomain}
        domain={{ parent_id: domain.id }}
      />
    </Container>
  </Fragment>
);

NewDomain.propTypes = {
  domain: PropTypes.object.isRequired,
  createDomain: PropTypes.func.isRequired
};

const mapStateToProps = ({ domain }) => ({ domain });
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ createDomain }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDomain);
