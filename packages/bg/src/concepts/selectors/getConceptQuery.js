import _ from "lodash/fp";
import routes from "../routes";

export const getConceptQuery = ({ conceptQuery }) => {
  let { query, filters, path, page, size } = conceptQuery;
  switch (path) {
    case routes.CONCEPTS:
      filters = {
        ...filters,
        status: ["published"]
      };
      break;
    case routes.CONCEPTS_PENDING:
      let { status } = filters;
      filters = _.isEmpty(status)
        ? {
            ...filters,
            status: ["pending_approval", "draft", "rejected"]
          }
        : filters;
      break;
  }
  return _.trim(query)
    ? {
        query: _.trim(query),
        filters,
        page: page - 1,
        size
      }
    : { filters, page: page - 1, size };
};
