import _ from "lodash/fp";
import React from "react";
import { bindActionCreators, compose } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { injectIntl, FormattedMessage } from "react-intl";
import { Label, Icon, Dropdown } from "semantic-ui-react";
import routes from "../routes";
import {
  fetchStructures,
  clearStructureQueryFilters,
  removeStructureSelectedFilter,
  openStructureFilter,
  closeStructureFilter
} from "../routines";

const sortOrder = _.flow(
  _.toLower,
  _.deburr
);

const handleClickFilter = (e, filter, value, fetchStructures, callback) => {
  e && e.preventDefault();
  e && e.stopPropagation();
  fetchStructures({ filter, value });
  callback && callback(filter);
};

const handleClearFilters = (
  e,
  fetchStructures,
  removeStructureSelectedFilter,
  clearStructureQueryFilters
) => {
  e && e.preventDefault();
  e && e.stopPropagation();
  fetchStructures({});
  removeStructureSelectedFilter();
  clearStructureQueryFilters();
};

const sortFilters = ({ structureFilters, formatMessage }) =>
  _.flow(
    _.mapValues(_.sortBy(sortOrder)),
    _.entries,
    _.filter(([, v]) => v.length > 1),
    _.sortBy(([filterName]) =>
      sortOrder(formatMessage({ id: `filters.${filterName}` }))
    ),
    _.keyby(([_k]) => _k),
    _.mapValues(([, v]) => v)
  )(structureFilters);

const handleDropdownOpen = (e, filterName, callback) => {
  e && e.preventDefault();
  e && e.stopPropagation();
  callback(filterName);
};

const handleDropdownClose = (e, callback) => {
  e && e.preventDefault();
  e && e.stopPropagation();
  callback();
};

const StructureSelectedFilters = ({
  activeFilters,
  structureFilters,
  structureSelectedFilters: { selectedFilters, openFilter },
  fetchStructures,
  clearStructureQueryFilters,
  removeStructureSelectedFilter,
  openStructureFilter,
  closeStructureFilter,
  intl: { formatMessage }
}) => {
  let filterOptions = {};

  if (!_.isEmpty(structureFilters)) {
    filterOptions = sortFilters({ structureFilters, formatMessage });
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
          <FormattedMessage id="structures.search.applied_filters" />
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
                        fetchStructures,
                        removeStructureSelectedFilter
                      )
                    }
                  />
                </Label>
              }
              onClick={e =>
                handleDropdownOpen(e, filterName, openStructureFilter)
              }
              onClose={e => handleDropdownClose(e, closeStructureFilter)}
              open={openFilter == filterName}
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={e =>
                    handleClickFilter(
                      e,
                      filterName,
                      undefined,
                      fetchStructures,
                      removeStructureSelectedFilter
                    )
                  }
                >
                  <em>
                    <FormattedMessage
                      id="structures.filters.reset"
                      defaultMessage="(reset filters)"
                    />
                  </em>
                </Dropdown.Item>
                {filterOptions[filterName].map(value => (
                  <Dropdown.Item
                    key={value}
                    onClick={e => {
                      handleClickFilter(e, filterName, value, fetchStructures);
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
                    {_.isEmpty(value) && (
                      <i>{formatMessage({ id: `structure.filter.empty` })}</i>
                    )}
                    {!_.isEmpty(value) && value}
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
              fetchStructures,
              removeStructureSelectedFilter,
              clearStructureQueryFilters
            )
          }
        >
          <FormattedMessage id="structures.search.clear_filters" />
        </a>
      )}
    </div>
  );
};

StructureSelectedFilters.propTypes = {
  activeFilters: PropTypes.object,
  structureFilters: PropTypes.object,
  fetchStructures: PropTypes.func,
  clearStructureQueryFilters: PropTypes.func,
  intl: PropTypes.object,
  structureSelectedFilters: PropTypes.object,
  removeStructureSelectedFilter: PropTypes.func,
  openStructureFilter: PropTypes.func,
  closeStructureFilter: PropTypes.func
};

const mapStateToProps = ({
  structureQuery: { filters },
  structureFilters,
  structureSelectedFilters
}) => ({
  active: !_.isEmpty(filters),
  activeFilters: filters,
  structureFilters,
  structureSelectedFilters
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      fetchStructures,
      clearStructureQueryFilters,
      removeStructureSelectedFilter,
      openStructureFilter,
      closeStructureFilter
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
)(StructureSelectedFilters);
