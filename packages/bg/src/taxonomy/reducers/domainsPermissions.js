import _ from "lodash/fp";
import { optionsDomains } from "../routines";

const initialState = {};

export const domainsPermissions = (state = initialState, { type, payload }) => {
  switch (type) {
    case optionsDomains.SUCCESS:
      const { headers } = payload;
      const allow = _.get("Allow")(headers) || _.get("allow")(headers) || "";
      return { list: _.includes("GET")(allow) };
    default:
      return state;
  }
};

export default domainsPermissions;
