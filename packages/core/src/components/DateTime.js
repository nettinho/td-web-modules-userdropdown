import React from "react";
import PropTypes from "prop-types";
import { FormattedDate } from "react-intl";

export const DateTime = ({ value }) => (
  <FormattedDate
    value={new Date(value)}
    year="numeric"
    month="short"
    day="2-digit"
    hourCycle="h23"
    hour="2-digit"
    minute="2-digit"
    second="2-digit"
  />
);

DateTime.propTypes = {
  value: PropTypes.string
};

export default DateTime;
