import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ConceptActions from "./ConceptActions";
import ConceptHeader from "./ConceptHeader";
import ConceptTabs from "./ConceptTabs";

export const Concept = ({ concept }) =>
  _.isEmpty(concept) ? null : (
    <React.Fragment>
      <ConceptHeader />
      <ConceptActions />
      <ConceptTabs />
    </React.Fragment>
  );

Concept.propTypes = {
  concept: PropTypes.object
};

const mapStateToProps = ({ concept }) => ({ concept });
export default compose(
  withRouter,
  connect(mapStateToProps)
)(Concept);
