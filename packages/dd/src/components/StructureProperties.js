import React from "react";
import PropTypes from "prop-types";
import { Label, Icon } from "semantic-ui-react";
import { compose } from "redux";
import { connect } from "react-redux";
import Moment from "react-moment";
import { injectIntl } from "react-intl";
import StructureForm from "./StructureForm";
import StructurePopup from "./StructurePopup";

const lopdDescription = {
  null: "no sensible",
  "1": "nivel básico",
  "2": "nivel medio",
  "3": "nivel alto"
};

export const StructureProperties = ({
  group,
  system,
  ou = "sin asignar",
  lopd,
  inserted_at,
  last_change_at,
  intl: { formatMessage }
}) => {
  const ouLabel = formatMessage({ id: "structure.ou" });
  const systemLabel = formatMessage({ id: "structure.system" });
  const groupLabel = formatMessage({ id: "structure.group" });
  const lopdLabel = formatMessage({ id: "structure.lopd" });
  const insertedAtLabel = formatMessage({ id: "structure.inserted_at" });
  const lastChangeAtLabel = formatMessage({ id: "structure.last_change_at" });

  return (
    <React.Fragment>
      <StructureForm />
      <Label.Group>
        {ou && (
          <Label as="a" title={ouLabel}>
            <Icon name="sitemap" />
            {ouLabel}: {ou}
          </Label>
        )}
        {system && (
          <Label as="a" title={systemLabel}>
            <Icon name="database" />
            {systemLabel}: {system}
          </Label>
        )}
        {group && (
          <Label as="a" title={groupLabel}>
            <Icon name="object group" />
            {groupLabel}: {group}
          </Label>
        )}
        <StructurePopup>
          <Label as="a" title={lopdLabel}>
            <Icon name="lock" />
            {lopdLabel}: {lopdDescription[lopd]}
          </Label>
        </StructurePopup>
        {inserted_at && (
          <Label as="a" title={` ${insertedAtLabel} ${inserted_at}`}>
            <Icon name="clock" />
            {insertedAtLabel}: <Moment locale="es" fromNow date={inserted_at} />
          </Label>
        )}
        {last_change_at && (
          <Label as="a" title={`${lastChangeAtLabel} ${last_change_at}`}>
            <Icon name="pencil square" />
            {lastChangeAtLabel}:{" "}
            <Moment locale="es" fromNow date={last_change_at} />
          </Label>
        )}
      </Label.Group>
    </React.Fragment>
  );
};

StructureProperties.propTypes = {
  group: PropTypes.string,
  system: PropTypes.string,
  ou: PropTypes.string,
  lopd: PropTypes.string,
  inserted_at: PropTypes.string,
  last_change_at: PropTypes.string,
  intl: PropTypes.object
};

const mapStateToProps = ({ structure }) => ({
  ...structure
});

export default compose(
  injectIntl,
  connect(mapStateToProps)
)(StructureProperties);
