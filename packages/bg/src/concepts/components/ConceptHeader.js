import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header, Icon } from "semantic-ui-react";

export const ConceptHeader = ({ concept, domain, template }) => (
  <Header as="h2">
    <Icon circular name="book" />
    <Header.Content>
      {concept.name}
      <Header.Subheader>
        {template.label} {domain && `in ${domain.name}`}
      </Header.Subheader>
    </Header.Content>
  </Header>
);

ConceptHeader.propTypes = {
  concept: PropTypes.object,
  domain: PropTypes.object,
  template: PropTypes.object
};

const mapStateToProps = ({ concept }) => ({
  concept,
  domain: concept.domain || {},
  template: concept.template || {}
});

export default connect(mapStateToProps)(ConceptHeader);
