import _ from "lodash/fp";

export const getPaths = _.pathOr([], "paths.paths");
