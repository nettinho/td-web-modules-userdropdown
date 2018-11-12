import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { fetchUsers } from "../routines";

class UsersLoader extends React.Component {
  static propTypes = {
    fetchUsers: PropTypes.func,
    usersLoading: PropTypes.bool
  };

  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers();
  }

  render() {
    const { usersLoading } = this.props;
    if (usersLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ usersLoading }) => ({ usersLoading });
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ fetchUsers }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersLoader);
