import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Checkbox, Dropdown } from "semantic-ui-react";
import { FormattedMessage, injectIntl } from "react-intl";
import { fetchConcepts } from "../routines";

const noTemplateFields = ["status", "rule_count", "link_count"];

const isFieldInTemplate = filterName =>
  !_.includes(filterName)(noTemplateFields);
export class FilterDropdown extends React.Component {
  static propTypes = {
    fetchConcepts: PropTypes.func.isRequired,
    filterName: PropTypes.string.isRequired,
    activeFilters: PropTypes.object,
    onOpen: PropTypes.func.isRequired,
    open: PropTypes.bool,
    values: PropTypes.array,
    intl: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, filter, value) {
    e.preventDefault();
    e.stopPropagation();
    const { fetchConcepts } = this.props;
    fetchConcepts({ filter, value });
  }

  render() {
    const {
      filterName,
      open,
      activeFilters,
      onOpen,
      values,
      intl: { formatMessage }
    } = this.props;
    const filterTitle = formatMessage({ id: `filters.${filterName}` });

    return (
      <Dropdown
        item
        text={filterTitle}
        onOpen={e => onOpen(e, filterName)}
        onClick={e => onOpen(e, filterName)}
        open={open}
        style={_.has(filterName)(activeFilters) ? { color: "red" } : {}}
      >
        <Dropdown.Menu>
          <Dropdown.Header>{filterTitle}</Dropdown.Header>
          <Dropdown.Item
            onClick={e => this.handleItemClick(e, filterName, undefined)}
            active={_.isEmpty(_.propOr([], filterName)(activeFilters))}
          >
            <em>
              <FormattedMessage
                id="concepts.filter.reset"
                defaultMessage="(reset filter)"
              />
            </em>
          </Dropdown.Item>
          {values.map((value, j) => (
            <Dropdown.Item
              key={j}
              onClick={e => this.handleItemClick(e, filterName, value)}
              active={_.includes(value)(
                _.propOr([], filterName)(activeFilters)
              )}
            >
              <Checkbox
                label={{
                  children: !isFieldInTemplate(filterName)
                    ? formatMessage({ id: `concepts.${filterName}.${value}` })
                    : value
                }}
                checked={_.includes(value)(
                  _.propOr([], filterName)(activeFilters)
                )}
              />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ fetchConcepts }, dispatch)
});
const mapStateToProps = ({ conceptQuery: { filters } }) => ({
  activeFilters: filters
});

export default compose(
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FilterDropdown);
