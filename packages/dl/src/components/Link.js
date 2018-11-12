import React from "react";
import PropTypes from "prop-types";

export const Link = ({ path }) => <path className="link" d={path} />;

Link.propTypes = {
  path: PropTypes.string.isRequired
};

export default Link;
