import _ from "lodash";
import React from "react";
import { Icon } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";

import { createSelector } from "reselect";

import Moment from "react-moment";
const iconDecorator = field => (field > 0 ? <Icon name="check circle" /> : "");

const translateDecorator = text => <FormattedMessage id={text} />;

const dateDecorator = date => <Moment locale="es" date={date} />;

const getConcepts = state => state.concepts;
const getColumns = state =>
  state.conceptsColumns || [
    { name: "name" },
    {
      name: "status",
      fieldDecorator: field => translateDecorator(`concepts.status.${field}`)
    },
    {
      name: "domain",
      fieldSelector: ({ domain }) => domain.name
    },
    {
      name: "rule_count",
      fieldDecorator: iconDecorator
    },
    { name: "link_count", fieldDecorator: iconDecorator },
    { name: "last_change_at", fieldDecorator: field => dateDecorator(field) }
  ];

export const getConceptColumns = createSelector(
  getColumns,
  conceptsColumns => conceptsColumns
);

export const getConceptsRows = createSelector(
  getConcepts,
  getColumns,
  (concepts, conceptsColumns) => {
    return _.map(concepts, concept =>
      _.pick(concept, [..._.map(conceptsColumns, "name"), "id"])
    );
  }
);
