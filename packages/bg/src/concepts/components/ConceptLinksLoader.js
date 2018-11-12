import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { fetchConceptLinks, clearConceptLinks } from "../routines";

class ConceptLinksLoader extends React.Component {
  static propTypes = {
    fetchConceptLinks: PropTypes.func,
    clearConceptLinks: PropTypes.func,
    resource_id: PropTypes.string,
    resource_type: PropTypes.string,
    conceptLinksLoading: PropTypes.bool
  };

  componentDidMount() {
    const { fetchConceptLinks, resource_id, resource_type } = this.props;

    if (resource_id) {
      fetchConceptLinks({ resource_id, resource_type });
    }
  }

  componentWillUnmount() {
    const { clearConceptLinks } = this.props;
    clearConceptLinks();
  }

  render() {
    const { conceptLinksLoading } = this.props;

    if (conceptLinksLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      clearConceptLinks,
      fetchConceptLinks
    },
    dispatch
  )
});

const mapStateToProps = ({ conceptLinksLoading }) => ({
  conceptLinksLoading
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConceptLinksLoader);
