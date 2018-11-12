import _ from "lodash/fp";
import React from "react";
import { bindActionCreators, compose } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { injectIntl, FormattedMessage } from "react-intl";
import { Label, Icon, Dropdown } from "semantic-ui-react";
import routes from "../routes";
import {
  fetchConcepts,
  clearConceptQueryFilters,
  removeConceptSelectedFilter,
  openConceptFilter,
  closeConceptFilter
} from "../routines";

const sortOrder = _.flow(
  _.toLower,
  _.deburr
);

const a = "";

const noTemplateFields = ["status", "rule_count", "link_count"];

const isFieldInTemplate = filterName =>
  !_.includes(filterName)(noTemplateFields);

const handleClickFilter = (e, filter, value, fetchConcepts, callback) => {
  e && e.preventDefault();
  e && e.stopPropagation();
  fetchConcepts({ filter, value });
  callback && callback(filter);
};

const handleClearFilters = (
  e,
  fetchConcepts,
  removeConceptSelectedFilter,
  clearConceptQueryFilters
) => {
  e && e.preventDefault();
  e && e.stopPropagation();
  fetchConcepts({});
  removeConceptSelectedFilter();
  clearConceptQueryFilters();
};

const sortFilters = ({ conceptFilters, formatMessage }) =>
  _.flow(
    _.mapValues(_.sortBy(sortOrder)),
    _.entries,
    _.filter(([, v]) => v.length > 1),
    _.sortBy(([filterName]) =>
      sortOrder(formatMessage({ id: `filters.${filterName}` }))
    ),
    _.keyby(([_k]) => _k),
    _.mapValues(([, v]) => v)
  )(conceptFilters);

const handleDropdownOpen = (e, filterName, callback) => {
  e && e.preventDefault();
  e && e.stopPropagation();
  callback(filterName);
};

const handleDropdownClose = (
  e,
  callback,
  activeFilters,
  selectedFilters,
  removeConceptSelectedFilter
) => {
  removeConceptSelectedFilter(
    _.filter(f => !_.has(f)(activeFilters))(selectedFilters)
  );
  e && e.preventDefault();
  e && e.stopPropagation();
  callback();
};

const ConceptSelectedFilters = ({
  activeFilters,
  conceptFilters,
  path,
  conceptSelectedFilters: { selectedFilters, openFilter },
  fetchConcepts,
  clearConceptQueryFilters,
  removeConceptSelectedFilter,
  openConceptFilter,
  closeConceptFilter,
  intl: { formatMessage }
}) => {
  let filterOptions = {};

  if (!_.isEmpty(conceptFilters)) {
    filterOptions = sortFilters({ conceptFilters, formatMessage });

    switch (path) {
      case routes.CONCEPTS:
        filterOptions = _.flow(_.omit(["status"]))(filterOptions);
        selectedFilters = _.flow(_.without(["status"]))(selectedFilters);
        break;
      case routes.CONCEPTS_PENDING:
        filterOptions = {
          ...filterOptions,
          status: ["pending_approval", "draft", "rejected"]
        };
        break;
    }
  }

  return (
    <div style={{ marginTop: "10px", display: "flex" }}>
      {!_.isEmpty(selectedFilters) && (
        <div
          style={{
            fontWeight: "bold",
            marginRight: "5px",
            lineHeight: "1.8em"
          }}
        >
          <FormattedMessage id="concepts.search.applied_filters" />
        </div>
      )}
      {!_.isEmpty(filterOptions) &&
        selectedFilters.map(filterName => (
          <div key={filterName}>
            <Dropdown
              item
              floating
              scrolling
              icon={false}
              upward={false}
              trigger={
                <Label key={filterName}>
                  <FormattedMessage id={`filters.${filterName}`} />
                  <Icon
                    name="delete"
                    onClick={e =>
                      handleClickFilter(
                        e,
                        filterName,
                        undefined,
                        fetchConcepts,
                        removeConceptSelectedFilter
                      )
                    }
                  />
                </Label>
              }
              onClick={e =>
                handleDropdownOpen(e, filterName, openConceptFilter)
              }
              onClose={e =>
                handleDropdownClose(
                  e,
                  closeConceptFilter,
                  activeFilters,
                  selectedFilters,
                  removeConceptSelectedFilter
                )
              }
              open={openFilter == filterName}
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={e =>
                    handleClickFilter(
                      e,
                      filterName,
                      undefined,
                      fetchConcepts,
                      removeConceptSelectedFilter
                    )
                  }
                >
                  <em>
                    <FormattedMessage
                      id="concepts.filters.reset"
                      defaultMessage="(reset filters)"
                    />
                  </em>
                </Dropdown.Item>
                {filterOptions[filterName].map(value => (
                  <Dropdown.Item
                    key={value}
                    onClick={e => {
                      handleClickFilter(e, filterName, value, fetchConcepts);
                    }}
                    active={_.includes(value)(
                      _.propOr([], filterName)(activeFilters)
                    )}
                  >
                    {_.includes(value)(
                      _.propOr([], filterName)(activeFilters)
                    ) ? (
                      <Icon name="check square outline" />
                    ) : (
                      <Icon name="square outline" />
                    )}
                    {isFieldInTemplate(filterName) &&
                      _.isEmpty(value) && (
                        <i>{formatMessage({ id: `concept.filter.empty` })}</i>
                      )}
                    {isFieldInTemplate(filterName) &&
                      !_.isEmpty(value) &&
                      value}
                    {!isFieldInTemplate(filterName) &&
                      formatMessage({ id: `concepts.${filterName}.${value}` })}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ))}
      {!_.isEmpty(selectedFilters) && (
        <a
          style={{
            cursor: "pointer",
            marginLeft: "10px",
            lineHeight: "1.8em"
          }}
          onClick={e =>
            handleClearFilters(
              e,
              fetchConcepts,
              removeConceptSelectedFilter,
              clearConceptQueryFilters
            )
          }
        >
          <FormattedMessage id="concepts.search.clear_filters" />
        </a>
      )}
    </div>
  );
};

ConceptSelectedFilters.propTypes = {
  activeFilters: PropTypes.object,
  conceptFilters: PropTypes.object,
  fetchConcepts: PropTypes.func,
  clearConceptQueryFilters: PropTypes.func,
  intl: PropTypes.object,
  conceptSelectedFilters: PropTypes.object,
  removeConceptSelectedFilter: PropTypes.func,
  openConceptFilter: PropTypes.func,
  closeConceptFilter: PropTypes.func
};

const mapStateToProps = ({
  conceptQuery: { filters },
  conceptQuery: { path },
  conceptFilters,
  conceptSelectedFilters
}) => ({
  active: !_.isEmpty(filters),
  path,
  activeFilters: filters,
  conceptFilters,
  conceptSelectedFilters
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      fetchConcepts,
      clearConceptQueryFilters,
      removeConceptSelectedFilter,
      openConceptFilter,
      closeConceptFilter
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
)(ConceptSelectedFilters);
