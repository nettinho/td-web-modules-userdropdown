import _ from "lodash/fp";
import { clearRedirect } from "@truedat/core/routines";
import {
  createDomain,
  deleteDomain,
  updateDomain,
  addDomainMember
} from "../routines";
import { linkTo } from "../routes";

const initialState = "";

const domainUrl = id => linkTo.DOMAIN({ id });
const domainMembersUrl = id => linkTo.DOMAIN_MEMBERS({ id });

export const domainRedirect = (
  state = initialState,
  { type, payload, meta }
) => {
  switch (type) {
    case clearRedirect.TRIGGER:
      return initialState;
    case createDomain.SUCCESS:
      return domainUrl(_.get("data.id", payload));
    case updateDomain.SUCCESS:
      return domainUrl(_.get("data.id", payload));
    case addDomainMember.SUCCESS:
      const id = _.get("data.resource_id")(payload);
      return domainMembersUrl(id);
    case deleteDomain.SUCCESS:
      const { redirectUrl } = meta;
      return redirectUrl;
    default:
      return state;
  }
};
