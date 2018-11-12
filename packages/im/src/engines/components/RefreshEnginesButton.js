import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";

import { fetchEngines } from "../routines";

const RefreshEnginesButton = ({ fetchEngines }) => (
  <Button
    style={{ float: "right", marginBottom: "10px" }}
    secondary
    onClick={() => fetchEngines()}
    icon="refresh"
  />
);

RefreshEnginesButton.propTypes = {
  fetchEngines: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ fetchEngines }, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(RefreshEnginesButton);
