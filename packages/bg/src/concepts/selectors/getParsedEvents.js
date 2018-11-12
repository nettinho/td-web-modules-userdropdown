import _ from "lodash/fp";
import { createSelector } from "reselect";
import { getEvents } from "./getEvents";

const toStr = field =>
  typeof field === "object" ? JSON.stringify(field) : field;

const getDeleteConceptDraftEvent = e => {
  const msg_key = "deleted_version";
  const { version } = e.payload;
  const msg_params = [toStr(version)];
  return { ...e, payload: [{ msg_key, msg_params }] };
};

const getNewConceptDraftEvent = e => {
  const msg_key = "created_version";
  const { version } = e.payload;
  const msg_params = [toStr(version)];
  return { ...e, payload: [{ msg_key, msg_params }] };
};

const getConceptFieldChanges = (msg_key, fields) =>
  _.flow(
    _.keys,
    _.map(key => ({ msg_key, msg_params: [key, toStr(fields[key])] }))
  )(fields);

const getUpdateConceptDraftEvent = e => {
  const { payload } = e;
  if (!payload) return { ...e, payload: [] };

  const { content } = payload;
  if (!content) return { ...e, payload: [] };

  const { name } = payload;
  const { description } = payload;

  let field_config = [];
  if (description)
    field_config = _.concat({
      msg_key: "changed_field",
      msg_params: ["description", e.payload["description"]]
    })(field_config);

  if (name)
    field_config = _.concat({
      msg_key: "changed_field",
      msg_params: ["name", e.payload["name"]]
    })(field_config);

  const { removed, added, changed } = content;
  if (removed && content && changed) {
    field_config = _.flow(
      _.concat([
        field_config,
        getConceptFieldChanges("changed_field", changed),
        getConceptFieldChanges("added_field", added),
        getConceptFieldChanges("removed_field", removed)
      ]),
      _.flatten
    )([]);
  }

  return { ...e, payload: field_config };
};

const getConceptFieldEvent = e => {
  const msg_key = "concept_field";
  const { system, group, structure, field } = e.payload.field;
  const msg_params = [system, group, structure, field];
  return { ...e, payload: [{ msg_key, msg_params }] };
};

const getEmptyPayloadEvent = e => ({ ...e, payload: [] });

const getParsedEvents = createSelector([getEvents], events => {
  return _.map(e => {
    const { event } = e;
    if (event === "create_concept_draft") {
      return getNewConceptDraftEvent(e);
    } else if (event === "update_concept_draft") {
      return getUpdateConceptDraftEvent(e);
    } else if (event === "delete_concept_draft") {
      return getDeleteConceptDraftEvent(e);
    } else if (event === "new_concept_draft") {
      return getNewConceptDraftEvent(e);
    } else if (
      event === "add_resource_field" ||
      event === "delete_resource_field"
    ) {
      return getConceptFieldEvent(e);
    } else {
      return getEmptyPayloadEvent(e);
    }
  })(events);
});

export { getParsedEvents };
