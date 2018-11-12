import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Header, Icon, Segment } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { createEngine } from "../routines";
import EngineForm from "./EngineForm";

export const NewEngine = ({ createEngine }) => (
  <Container as={Segment} text>
    <Header as="h2">
      <Icon name="wrench" />
      <Header.Content>
        <FormattedMessage id="intake.engine.new" />
      </Header.Content>
    </Header>
    <EngineForm handleSubmit={createEngine} />
  </Container>
);

NewEngine.propTypes = {
  createEngine: PropTypes.func.isRequired
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ createEngine }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewEngine);
