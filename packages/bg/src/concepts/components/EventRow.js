import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { Feed } from "semantic-ui-react";
import { injectIntl } from "react-intl";
import Moment from "react-moment";

export const EventRow = ({
  user_name,
  event,
  ts,
  payload,
  intl,
  intl: { formatMessage }
}) => (
  <Feed.Event>
    <Feed.Content>
      <Feed.Summary>
        <Feed.User> {user_name} </Feed.User>{" "}
        {formatMessage({ id: `concept.events.${event}` })}{" "}
        <Feed.Date>
          <Moment locale={intl.locale} fromNow date={ts} />
        </Feed.Date>
      </Feed.Summary>
      {payload.map(({ msg_key, msg_params }, i) => (
        <Feed.Extra
          key={i}
          text
          content={formatMessage(
            { id: `concept.events.extra.${msg_key}` },
            msg_params
          )}
        />
      ))}
    </Feed.Content>
  </Feed.Event>
);

EventRow.propTypes = {
  user_name: PropTypes.string,
  event: PropTypes.string,
  ts: PropTypes.string,
  intl: PropTypes.object,
  payload: PropTypes.array
};

export default compose(
  injectIntl,
  withRouter
)(EventRow);
