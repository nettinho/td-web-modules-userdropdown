import _ from "lodash/fp";
import React from "react";
import { bindActionCreators, compose } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { injectIntl, FormattedMessage } from "react-intl";
import routes from "../routes";
import {
  fetchConcepts,
  clearConceptQueryFilters,
  addConceptSelectedFilter,
  openConceptFilter
} from "../routines";

const sortOrder = _.flow(
  _.toLower,
  _.deburr
);

const sortFilters = ({ conceptFilters, selectedFilters, formatMessage }) =>
  _.flow(
    _.mapValues(_.filter(_.negate(_.isEmpty))),
    _.mapValues(_.sortBy(sortOrder)),
    _.omit(selectedFilters),
    _.entries,
    _.filter(([, v]) => v.length > 1),
    _.sortBy(([filterName]) =>
      sortOrder(formatMessage({ id: `filters.${filterName}` }))
    ),
    _.keyby(([_k]) => _k),
    _.mapValues(([, v]) => v)
  )(conceptFilters);

const pendingFilters = ({ conceptSelectedFilters, filterOptions }) =>
  _.includes("status")(conceptSelectedFilters)
    ? { ...filterOptions, status: ["pending_approval", "draft", "rejected"] }
    : filterOptions;

export class ConceptFilters extends React.Component {
  static propTypes = {
    conceptFilters: PropTypes.object,
    path: PropTypes.string,
    intl: PropTypes.object,
    clearConceptQueryFilters: PropTypes.func,
    addConceptSelectedFilter: PropTypes.func,
    conceptSelectedFilters: PropTypes.object,
    openConceptFilter: PropTypes.func
  };

  render = () => {
    const {
      conceptFilters,
      path,
      clearConceptQueryFilters,
      intl: { formatMessage },
      conceptSelectedFilters: { selectedFilters },
      addConceptSelectedFilter,
      openConceptFilter
    } = this.props;

    let filterOptions = sortFilters({
      conceptFilters,
      selectedFilters,
      formatMessage
    });

    switch (path) {
      case routes.CONCEPTS:
        filterOptions = _.flow(_.omit(["status"]))(filterOptions);
        break;
      case routes.CONCEPTS_PENDING:
        filterOptions = pendingFilters({ selectedFilters, filterOptions });
        break;
    }

    return (
      <React.Fragment>
        <Dropdown
          text={formatMessage({
            id: "concepts.filters",
            defaultMessage: "Filters"
          })}
          icon="filter"
          floating
          labeled
          button
          className="icon"
          scrolling
          upward={false}
          onOpen={() => openConceptFilter("")}
        >
          <Dropdown.Menu>
            <Dropdown.Item onClick={clearConceptQueryFilters}>
              <em>
                <FormattedMessage
                  id="concepts.filters.reset"
                  defaultMessage="(reset filters)"
                />
              </em>
            </Dropdown.Item>
            {Object.keys(filterOptions).map(filterName => (
              <Dropdown.Item
                key={filterName}
                text={formatMessage({ id: `filters.${filterName}` })}
                onClick={() => {
                  addConceptSelectedFilter(filterName);
                }}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </React.Fragment>
    );
  };
}

const mapStateToProps = ({
  conceptQuery: { filters },
  conceptQuery: { path },
  conceptFilters,
  conceptSelectedFilters
}) => ({
  conceptFilters,
  path,
  active: !_.isEmpty(filters),
  conceptSelectedFilters
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      fetchConcepts,
      clearConceptQueryFilters,
      addConceptSelectedFilter,
      openConceptFilter
    },
    dispatch
  )
});

export default compose(
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConceptFilters);
