import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Header, Icon, Segment } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { updateDomain } from "../routines";
import DomainForm from "./DomainForm";
import DomainCrumbs from "./DomainCrumbs";

export const EditDomain = ({ domain, updateDomain }) => (
  <Fragment>
    <DomainCrumbs actionCrumb="domain.actions.edit.header" />
    <Container as={Segment} text>
      <Header as="h2">
        <Icon name="cube" />
        <Header.Content>
          <FormattedMessage id="domain.actions.edit.header" />
        </Header.Content>
      </Header>
      <DomainForm handleSubmit={updateDomain} domain={domain} />
    </Container>
  </Fragment>
);

EditDomain.propTypes = {
  domain: PropTypes.object.isRequired,
  updateDomain: PropTypes.func.isRequired
};

const mapStateToProps = ({ domain }) => ({ domain });
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateDomain }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDomain);
