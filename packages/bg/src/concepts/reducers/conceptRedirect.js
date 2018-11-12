import _ from "lodash/fp";
import { clearRedirect } from "@truedat/core/routines";
import { conceptAction, linkConcept } from "../routines";
import routes, { linkTo } from "../routes";

const initialState = "";

const conceptsUrl = () => routes.CONCEPTS;
const conceptUrl = id => linkTo.CONCEPT({ id });

export const conceptRedirect = (
  state = initialState,
  { type, payload, meta }
) => {
  switch (type) {
    case clearRedirect.TRIGGER:
      return initialState;
    case conceptAction.SUCCESS:
      return _.propEq("method", "DELETE")(meta)
        ? conceptsUrl()
        : _.includes(_.get("action")(meta))(["version", "update", "create"])
          ? conceptUrl(_.get("data.id")(payload))
          : state;
    case linkConcept.SUCCESS: {
      const { redirectUrl } = meta;
      return redirectUrl;
    }
    default:
      return state;
  }
};
