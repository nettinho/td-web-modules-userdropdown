import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Table, Label } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";

export const Engine = ({
  id,
  datalake,
  bucket,
  system,
  source,
  host,
  port,
  status,
  history
}) => (
  <Table.Row>
    <Table.Cell content={datalake.name} />
    <Table.Cell content={datalake.bucket} />
    <Table.Cell content={system} />
    <Table.Cell content={source} />
    <Table.Cell content={host} />
    <Table.Cell content={port} />
    <Table.Cell content={status} />
  </Table.Row>
);

Engine.propTypes = {
  id: PropTypes.number,
  datalake: PropTypes.object,
  bucket: PropTypes.string,
  system: PropTypes.string,
  source: PropTypes.string,
  host: PropTypes.string,
  port: PropTypes.string,
  status: PropTypes.string,
  history: PropTypes.object
};

export default withRouter(Engine);
