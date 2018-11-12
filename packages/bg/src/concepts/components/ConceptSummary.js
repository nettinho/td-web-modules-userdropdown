import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header, Label, List, Icon, Segment } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { getFieldValues } from "../selectors";
import { mapStatusColor } from "../constants/mappings";

const url_params = {
  dashboard_uid: "business_concept",
  dashboard_title: "business-concept",
  varname: "var-quality"
};

const Bold = ({ children }) => (
  <div style={{ fontWeight: "bold", minWidth: "100px" }}>{children}</div>
);

const FieldValue = ({ field, value, color, in_progress }) => (
  <List.Item style={{ marginBottom: "5px" }}>
    <List.Content style={{ display: "inline-flex" }}>
      <Bold>
        <FormattedMessage id={`concept.props.${field}`} />:
      </Bold>
      <Label color={color}>
        {value || <Icon name="ellipsis vertical" color="grey" />}
      </Label>
      {in_progress && (
        <Label color="red">
          {<FormattedMessage id={`concept.props.in_progress`} />}
        </Label>
      )}
    </List.Content>
  </List.Item>
);

FieldValue.propTypes = {
  field: PropTypes.any,
  value: PropTypes.any,
  color: PropTypes.any,
  in_progress: PropTypes.bool
};

export const ConceptSummary = ({
  concept: {
    id,
    completeness,
    status,
    version,
    last_change_at,
    last_change_user,
    in_progress
  }
}) => (
  <React.Fragment>
    <Segment>
      <Header as="h3" dividing>
        <FormattedMessage id="concepts.summary" defaultMessage="Resumen" />
      </Header>

      <FieldValue
        field="status"
        value={<FormattedMessage id={`concepts.status.${status}`} />}
        color={mapStatusColor[status]}
        in_progress={in_progress}
      />
      <FieldValue field="version" value={version} />
      <FieldValue
        field="last_update_at"
        value={<Moment locale="es" date={last_change_at} />}
      />
      <FieldValue
        field="last_update_by"
        value={(last_change_user && last_change_user.full_name) || ""}
      />
    </Segment>
  </React.Fragment>
);

ConceptSummary.propTypes = {
  concept: PropTypes.object
};

const mapStateToProps = state => ({
  concept: state.concept,
  fieldValues: getFieldValues(state)
});

export default connect(mapStateToProps)(ConceptSummary);
