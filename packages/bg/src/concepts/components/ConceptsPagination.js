import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Pagination } from "semantic-ui-react";
import { selectConceptPage } from "../routines";

export const ConceptsPagination = ({
  totalPages,
  activePage,
  selectConceptPage
}) => (
  <Pagination
    activePage={activePage}
    totalPages={totalPages}
    onPageChange={(_e, { activePage }) => selectConceptPage({ activePage })}
  />
);

ConceptsPagination.propTypes = {
  totalPages: PropTypes.number,
  activePage: PropTypes.number,
  selectConceptPage: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ selectConceptPage }, dispatch)
});

const mapStateToProps = ({ conceptQuery: { page, size }, conceptCount }) => ({
  activePage: page,
  totalPages: 1 + Math.floor(conceptCount / size)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConceptsPagination);
