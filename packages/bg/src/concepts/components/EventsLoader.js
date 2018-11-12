import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components/Loading";
import { fetchEvents, clearEvents } from "@truedat/core/routines";

export class EventsLoader extends React.Component {
  static propTypes = {
    fetchEvents: PropTypes.func,
    resource_id: PropTypes.number,
    eventsLoading: PropTypes.bool,
    clearEvents: PropTypes.func
  };

  componentDidMount() {
    const { fetchEvents, resource_id } = this.props;
    if (resource_id) {
      fetchEvents({ resource_id, resource_type: "concept" });
    }
  }

  componentWillUnmount() {
    const { clearEvents } = this.props;
    clearEvents();
  }

  render() {
    const { eventsLoading } = this.props;
    if (eventsLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ clearEvents, fetchEvents }, dispatch)
});

const mapStateToProps = ({ eventsLoading }) => ({ eventsLoading });

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EventsLoader);
