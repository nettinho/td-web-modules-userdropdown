import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { Dimmer, Loader } from "semantic-ui-react";
import { fetchConcept, clearConcept } from "../routines";

export class ConceptLoader extends React.Component {
  static propTypes = {
    clearConcept: PropTypes.func,
    fetchConcept: PropTypes.func,
    match: PropTypes.object,
    conceptLoading: PropTypes.bool,
    business_concept_id: PropTypes.number
  };

  componentDidMount() {
    const { fetchConcept, match } = this.props;
    const { id } = match.params;
    if (id) {
      fetchConcept({ id });
    }
  }

  componentWillUnmount() {
    const { clearConcept } = this.props;
    clearConcept();
  }

  componentDidUpdate(prevProps) {
    const { clearConcept, fetchConcept, match } = this.props;
    const { id } = match.params;
    if (prevProps.match.params.id !== id) {
      if (id) {
        fetchConcept({ id });
      } else {
        clearConcept();
      }
    }
  }

  render() {
    const { conceptLoading } = this.props;

    if (conceptLoading) {
      return (
        <React.Fragment>
          <Dimmer active={conceptLoading} inverted>
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
  ...bindActionCreators({ clearConcept, fetchConcept }, dispatch)
});

const mapStateToProps = ({ conceptLoading }) => ({
  conceptLoading
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConceptLoader);
