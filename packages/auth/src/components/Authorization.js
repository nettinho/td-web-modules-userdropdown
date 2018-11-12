import React from "react";

const Authorization = allowedRoles => WrappedComponent => props => {
  const { authentication } = props;
  const { is_admin } = authentication;
  const roles = [is_admin == true ? "superadmin" : "user"];
  if (allowedRoles.includes(...roles)) {
    return <WrappedComponent {...props} />;
  } else {
    return null;
  }
};

export default Authorization;
