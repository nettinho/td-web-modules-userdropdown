import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Pagination } from "semantic-ui-react";
import { selectStructurePage } from "../routines";

export const StructuresPagination = ({
  totalPages,
  activePage,
  selectStructurePage
}) => (
  <Pagination
    activePage={activePage}
    totalPages={totalPages}
    onPageChange={(_e, { activePage }) => selectStructurePage({ activePage })}
  />
);

StructuresPagination.propTypes = {
  totalPages: PropTypes.number,
  activePage: PropTypes.number,
  selectStructurePage: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ selectStructurePage }, dispatch)
});

const mapStateToProps = ({
  structureQuery: { page, size },
  structureCount
}) => ({
  activePage: page,
  totalPages: 1 + Math.floor(structureCount / size)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StructuresPagination);
