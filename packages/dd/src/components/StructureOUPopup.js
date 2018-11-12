import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Dropdown, Grid, Header, Popup } from "semantic-ui-react";
import { injectIntl } from "react-intl";
import { updateStructure } from "../routines";

export const StructureOUPopup = ({
  id,
  children,
  ou,
  updateStructure,
  domains,
  intl: { formatMessage }
}) => (
  <Popup trigger={children} wide="very" hoverable position="bottom center">
    <Grid centered divided columns={1}>
      <Grid.Row>
        <Grid.Column>
          <Header as="h4">{formatMessage({ id: "structure.ous" })}</Header>
          <Dropdown
            placeholder={formatMessage({ id: "domain.selector.placeholder" })}
            options={domains}
            onChange={(e, { value }) =>
              updateStructure({
                data_structure: { id, ou: value }
              })
            }
            value={ou}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Popup>
);

StructureOUPopup.propTypes = {
  id: PropTypes.number,
  children: PropTypes.node,
  ou: PropTypes.string,
  updateStructure: PropTypes.func,
  domains: PropTypes.array,
  intl: PropTypes.object
};

const mapStateToProps = ({ structure, domains }) => ({
  domains: domains.map(({ name }, i) => ({ key: i, value: name, text: name })),
  ..._.pick(["id", "ou"])(structure)
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateStructure }, dispatch)
});

export default compose(
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(StructureOUPopup);
