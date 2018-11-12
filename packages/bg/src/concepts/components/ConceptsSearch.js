import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Input } from "semantic-ui-react";
import { injectIntl } from "react-intl";
import { fetchConcepts } from "../routines";
import ConceptFilters from "./ConceptFilters";

const ConceptsSearch = ({
  loading,
  query,
  intl: { formatMessage },
  fetchConcepts
}) => (
  <Input
    value={query}
    onChange={(_e, data) => fetchConcepts({ query: data.value })}
    icon={{ name: "search", link: true }}
    iconPosition="left"
    action={<ConceptFilters />}
    loading={loading}
    placeholder={formatMessage({ id: "concepts.search.placeholder" })}
  />
);

ConceptsSearch.propTypes = {
  loading: PropTypes.bool,
  intl: PropTypes.object,
  query: PropTypes.string,
  fetchConcepts: PropTypes.func
};

const mapStateToProps = ({
  conceptsLoading,
  conceptFiltersLoading,
  conceptQuery: { query }
}) => ({
  loading: conceptsLoading || conceptFiltersLoading,
  query
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ fetchConcepts }, dispatch)
});

export default compose(
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConceptsSearch);
