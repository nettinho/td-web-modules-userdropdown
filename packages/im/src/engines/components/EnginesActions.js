import _ from "lodash/fp";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import routes from "../routes";
import RefreshEnginesButton from "./RefreshEnginesButton";

const createUrl = routes.ENGINE_NEW;

export const EnginesActions = ({ intl: { formatMessage } }) => (
  <React.Fragment>
    <Button
      style={{ float: "right" }}
      secondary
      content={formatMessage({ id: "intake.engine.actions.create" })}
      icon="setting"
      as={Link}
      to={createUrl}
    />
    <RefreshEnginesButton />
  </React.Fragment>
);

EnginesActions.propTypes = {
  intl: PropTypes.object
};

export default injectIntl(EnginesActions);
