import React from "react";
import PropTypes from "prop-types";
import { Feed, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { compose } from "redux";
import { injectIntl } from "react-intl";
import { getParsedEvents } from "../selectors";
import EventRow from "./EventRow";

export const Events = ({ events, eventsLoading }) =>
  eventsLoading ? null : (
    <Segment attached="bottom">
      <Feed size="small">
        {events.map((e, i) => <EventRow key={i} {...e} />)}
      </Feed>
    </Segment>
  );

Events.propTypes = {
  events: PropTypes.array,
  eventsLoading: PropTypes.bool
};

const mapStateToProps = state => ({
  events: getParsedEvents(state),
  eventsLoading: state.eventsLoading
});

export default compose(
  injectIntl,
  connect(mapStateToProps)
)(Events);
