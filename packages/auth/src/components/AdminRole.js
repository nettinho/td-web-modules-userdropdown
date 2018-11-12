import { compose } from "redux";
import { connect } from "react-redux";
import Authorization from "./Authorization";

const mapStateToProps = ({ authentication }) => ({ authentication });

const AdminRole = compose(
  connect(mapStateToProps),
  Authorization(["superadmin"])
);

export default AdminRole;
