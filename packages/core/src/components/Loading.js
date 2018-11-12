import React from "react";
import PropTypes from "prop-types";
import { Loader, Message } from "semantic-ui-react";

export const Loading = ({ inline, error, pastDelay }) =>
  error && error.code == "MODULE_NOT_FOUND" ? null : error ? (
    <Message content={error.message} />
  ) : pastDelay ? (
    <Loader active inline={inline} />
  ) : null;

Loading.propTypes = {
  inline: PropTypes.string,
  error: PropTypes.object,
  pastDelay: PropTypes.bool
};

export default Loading;
