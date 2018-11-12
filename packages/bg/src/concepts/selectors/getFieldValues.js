import { createSelector } from "reselect";
import { getTemplateGroups } from "./getTemplateGroups";
import { getConcept } from "./getConcept";

export const getFieldValues = createSelector(
  [getTemplateGroups, getConcept],
  (groups, concept) =>
    groups && concept && concept.content
      ? groups.map(([name, fields]) => [
          name,
          fields.map(f => ({
            field: f.label,
            type: f.type,
            widget: f.widget,
            value: concept.content[f.name],
            hidden:
              "depends" in f && f.depends.to_be != concept.content[f.depends.on]
          }))
        ])
      : []
);
