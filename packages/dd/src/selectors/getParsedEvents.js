import _ from "lodash/fp";
import { createSelector } from "reselect";

const getEvents = ({ events }) => events;

const transformFieldFormat = field =>
  typeof field === "object" ? JSON.stringify(field) : field;

const getParsedEvents = createSelector([getEvents], events =>
  _.map(d => ({
    ...d,
    payload: _.map(e => ({
      field: e,
      value: transformFieldFormat(d["payload"][e])
    }))(_.keys(d["payload"]))
  }))(events)
);

export { getParsedEvents };
