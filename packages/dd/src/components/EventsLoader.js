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
    match: PropTypes.object,
    eventsLoading: PropTypes.bool,
    clearEvents: PropTypes.func
  };

  componentDidMount() {
    const { fetchEvents, match } = this.props;
    const { id } = match.params;
    if (id) {
      fetchEvents({ resource_id: id, resource_type: "data_structure" });
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
