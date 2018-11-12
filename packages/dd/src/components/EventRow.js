import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { Feed } from "semantic-ui-react";
import { injectIntl } from "react-intl";
import Moment from "react-moment";

export const EventRow = ({
  user_name,
  ts,
  payload,
  intl,
  intl: { formatMessage }
}) => (
  <Feed.Event>
    <Feed.Content>
      <Feed.Summary>
        <Feed.User>{user_name}</Feed.User>{" "}
        <Feed.Date>
          <Moment locale={intl.locale} fromNow date={ts} />
        </Feed.Date>
      </Feed.Summary>
      {payload.map((e, i) => (
        <Feed.Extra
          key={i}
          text
          content={formatMessage({ id: "events.text" }, e)}
        />
      ))}
    </Feed.Content>
  </Feed.Event>
);

EventRow.propTypes = {
  user_name: PropTypes.string,
  ts: PropTypes.string,
  intl: PropTypes.object,
  payload: PropTypes.array
};

export default compose(
  injectIntl,
  withRouter
)(EventRow);
