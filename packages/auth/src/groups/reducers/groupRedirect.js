import { clearRedirect } from "@truedat/core/routines";
import { createGroup, deleteGroup, updateGroup } from "../routines";
import routes from "../routes";

const initialState = "";

const groupsUrl = () => routes.GROUP_LIST;

export const groupRedirect = (state = initialState, { type }) => {
  switch (type) {
    case clearRedirect.TRIGGER:
      return initialState;
    case createGroup.SUCCESS:
      return groupsUrl();
    case updateGroup.SUCCESS:
      return groupsUrl();
    case deleteGroup.SUCCESS:
      return groupsUrl();
    default:
      return state;
  }
};
