import React from "react";
import { Dropdown, Form, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { compose } from "redux";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";

const SelectRow = props => {
  const {
    index,
    row,
    handleChange,
    listSelectedResources,
    intl: { formatMessage }
  } = props;
  const { key, children, value: rowValue, bottomLevel } = row;
  const optionChildren = children.map(option => {
    return { id: option.id, value: option.value, text: option.label };
  });
  const value = !bottomLevel ? rowValue : listSelectedResources;
  const level = index + 1;

  return (
    <Form.Field>
      <Label pointing="below">
        {formatMessage({ id: "navigation.lineage.selection" }, { level })}
      </Label>
      <Dropdown
        id={key}
        placeholder="Select Resource"
        fluid
        search
        selection
        value={value}
        multiple={bottomLevel}
        options={optionChildren}
        onChange={handleChange}
      />
    </Form.Field>
  );
};

SelectRow.propTypes = {
  row: PropTypes.shape({}),
  index: PropTypes.number,
  handleChange: PropTypes.func,
  listSelectedResources: PropTypes.array
};

const mapStateToProps = ({ lineageResources }) => ({
  listSelectedResources: lineageResources.listSelectedResources
});

export default compose(
  injectIntl,
  connect(
    mapStateToProps,
    null
  )
)(SelectRow);
