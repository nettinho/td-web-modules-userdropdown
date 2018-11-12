import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Input } from "semantic-ui-react";
import { injectIntl } from "react-intl";
import { fetchStructures } from "../routines";
import StructureFilters from "./StructureFilters";

const StructuresSearch = ({
  loading,
  query,
  intl: { formatMessage },
  fetchStructures
}) => (
  <Input
    value={query}
    onChange={(_e, data) => fetchStructures({ query: data.value })}
    icon={{ name: "search", link: true }}
    iconPosition="left"
    action={<StructureFilters />}
    loading={loading}
    placeholder={formatMessage({ id: "structures.search.placeholder" })}
  />
);

StructuresSearch.propTypes = {
  loading: PropTypes.bool,
  intl: PropTypes.object,
  query: PropTypes.string,
  fetchStructures: PropTypes.func
};

const mapStateToProps = ({ structuresLoading, structureQuery: { query } }) => ({
  loading: structuresLoading,
  query
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ fetchStructures }, dispatch)
});

export default compose(
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(StructuresSearch);
