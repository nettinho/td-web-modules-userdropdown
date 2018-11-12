import _ from "lodash/fp";
import { createSelector } from "reselect";

const getConceptLinkStructures = ({ conceptLinkStructures }) =>
  conceptLinkStructures;
const getConceptLinkFields = ({ conceptLinkFields }) => conceptLinkFields;

export const getOus = createSelector(
  [getConceptLinkStructures],
  conceptLinkStructures =>
    _.flow(
      _.map("ou"),
      _.uniq,
      _.map(ou => ({ text: ou, value: ou }))
    )(conceptLinkStructures)
);

export const getOuSystems = createSelector(
  [getConceptLinkStructures],
  conceptLinkStructures =>
    _.flow(
      _.groupBy("ou"),
      _.mapValues(
        _.flow(
          _.map(({ system }) => system),
          _.uniq,
          _.map(s => ({ text: s, value: s }))
        )
      )
    )(conceptLinkStructures)
);

export const getOuSystemGroups = createSelector(
  [getConceptLinkStructures],
  conceptLinkStructures =>
    _.flow(
      _.groupBy("ou"),
      _.mapValues(
        _.flow(
          _.groupBy("system"),
          _.mapValues(
            _.flow(
              _.map(({ group }) => group),
              _.uniq,
              _.map(g => ({ text: g, value: g }))
            )
          )
        )
      )
    )(conceptLinkStructures)
);

export const getOuSystemGroupStructures = createSelector(
  [getConceptLinkStructures],
  conceptLinkStructures =>
    _.flow(
      _.groupBy("ou"),
      _.mapValues(
        _.flow(
          _.groupBy("system"),
          _.mapValues(
            _.flow(
              _.groupBy("group"),
              _.mapValues(
                _.flow(
                  _.map(({ id, name }) => ({ id, name })),
                  _.uniqBy("name"),
                  _.map(({ id, name }) => ({ text: name, value: id }))
                )
              )
            )
          )
        )
      )
    )(conceptLinkStructures)
);

export const getOuSystemGroupStructureFields = createSelector(
  [getConceptLinkFields],
  conceptLinkFields =>
    _.flow(_.map(({ id, name }) => ({ text: name, value: id })))(
      conceptLinkFields
    )
);
