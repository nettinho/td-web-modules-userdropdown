import _ from "lodash/fp";

export const getStructureQuery = ({ structureQuery }) => {
  let { query, filters, page, size } = structureQuery;
  return _.trim(query)
    ? {
        query: _.trim(query),
        filters,
        page: page - 1,
        size
      }
    : { filters, page: page - 1, size };
};
