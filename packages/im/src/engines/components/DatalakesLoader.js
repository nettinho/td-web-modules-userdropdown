import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { Dimmer, Loader } from "semantic-ui-react";
import { fetchDatalakes, clearDatalakes } from "../routines";

export class DatalakesLoader extends React.Component {
  static propTypes = {
    clearDatalakes: PropTypes.func,
    fetchDatalakes: PropTypes.func,
    datalakesLoading: PropTypes.bool
  };

  componentDidMount() {
    const { fetchDatalakes } = this.props;
    fetchDatalakes();
  }

  componentWillUnmount() {
    const { clearDatalakes } = this.props;
    clearDatalakes();
  }

  render() {
    const { datalakesLoading } = this.props;

    if (datalakesLoading) {
      return (
        <React.Fragment>
          <Dimmer active={datalakesLoading} inverted>
            <Loader size="massive" inverted />
          </Dimmer>
          <Loading />;
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ clearDatalakes, fetchDatalakes }, dispatch)
});

const mapStateToProps = ({ datalakesLoading }) => ({
  datalakesLoading
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DatalakesLoader);
