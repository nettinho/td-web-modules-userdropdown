import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { clearStructures, fetchStructures } from "../routines";

export class StructuresLoader extends React.Component {
  static propTypes = {
    fetchStructures: PropTypes.func,
    clearStructures: PropTypes.func,
    structuresLoading: PropTypes.bool
  };

  componentDidMount() {
    const { fetchStructures } = this.props;
    fetchStructures({});
  }

  componentWillUnmount() {
    const { clearStructures } = this.props;
    clearStructures();
  }

  render() {
    const { structuresLoading } = this.props;

    if (structuresLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ clearStructures, fetchStructures }, dispatch)
});

const mapStateToProps = ({ structuresLoading }) => ({ structuresLoading });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StructuresLoader);
