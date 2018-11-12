import _ from "lodash/fp";
import React from "react";
import { bindActionCreators, compose } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { injectIntl, FormattedMessage } from "react-intl";
import routes from "../routes";
import {
  fetchStructures,
  clearStructureQueryFilters,
  addStructureSelectedFilter,
  openStructureFilter
} from "../routines";

const sortOrder = _.flow(
  _.toLower,
  _.deburr
);

const sortFilters = ({ structureFilters, selectedFilters, formatMessage }) =>
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
  )(structureFilters);

export class StructureFilters extends React.Component {
  static propTypes = {
    structureFilters: PropTypes.object,
    intl: PropTypes.object,
    clearStructureQueryFilters: PropTypes.func,
    addStructureSelectedFilter: PropTypes.func,
    structureSelectedFilters: PropTypes.object,
    openStructureFilter: PropTypes.func
  };

  render = () => {
    const {
      structureFilters,
      clearStructureQueryFilters,
      intl: { formatMessage },
      structureSelectedFilters: { selectedFilters },
      addStructureSelectedFilter,
      openStructureFilter
    } = this.props;

    let filterOptions = sortFilters({
      structureFilters,
      selectedFilters,
      formatMessage
    });

    return (
      <React.Fragment>
        <Dropdown
          text={formatMessage({
            id: "structures.filters",
            defaultMessage: "Filters"
          })}
          icon="filter"
          floating
          labeled
          button
          className="icon"
          scrolling
          upward={false}
          onOpen={() => openStructureFilter("")}
        >
          <Dropdown.Menu>
            <Dropdown.Item onClick={clearStructureQueryFilters}>
              <em>
                <FormattedMessage
                  id="structures.filters.reset"
                  defaultMessage="(reset filters)"
                />
              </em>
            </Dropdown.Item>
            {Object.keys(filterOptions).map(filterName => (
              <Dropdown.Item
                key={filterName}
                text={formatMessage({ id: `filters.${filterName}` })}
                onClick={() => {
                  addStructureSelectedFilter(filterName);
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
  structureQuery: { filters },
  structureFilters,
  structureSelectedFilters
}) => ({
  structureFilters,
  active: !_.isEmpty(filters),
  structureSelectedFilters
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      fetchStructures,
      clearStructureQueryFilters,
      addStructureSelectedFilter,
      openStructureFilter
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
)(StructureFilters);
