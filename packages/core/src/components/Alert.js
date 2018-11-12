import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { injectIntl } from "react-intl";
import { compose } from "redux";
import { connect } from "react-redux";

const default_error_value = { name: "error.unknown" };

const existing_errors_list = errors => errors && !_.isEmpty(errors);

const formatErrorMessages = (error, formatMessage) => {
  if (_.every(["name", "code"], _.partial(_.has)(error)))
    return formatMessage({ id: error.name }, { text: error.code });

  if (_.has("name")(error)) return formatMessage({ id: error.name });

  return formatMessage({ id: default_error_value.name });
};

export const Alert = ({
  message: { error, header, content, text, errorList, icon, color, fields },
  intl: { formatMessage }
}) => {
  const errors = _.map(e => formatErrorMessages(e, formatMessage))(errorList);
  const message_content =
    content && !existing_errors_list(errors)
      ? formatMessage({ id: content }, { text, ...fields })
      : undefined;
  return content || header ? (
    <Message
      error={error}
      header={formatMessage({ id: header })}
      content={message_content}
      list={errors}
      icon={icon}
      color={color}
      visible
    />
  ) : null;
};

Alert.propTypes = {
  message: PropTypes.object,
  intl: PropTypes.object
};

const mapStateToProps = ({ message }) => ({ message });

export default compose(
  withRouter,
  injectIntl,
  connect(mapStateToProps)
)(Alert);
