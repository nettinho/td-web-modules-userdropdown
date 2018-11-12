import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import ResponsiveEmbed from "react-responsive-embed";

const url_params = {
  dashboard_uid: "business_concept",
  dashboard_title: "business-concept",
  varname: "var-quality"
};

export const ConceptMetrics = ({ concept: { id, completeness } }) => (
  <React.Fragment>
    {/* <Segment> */}
    <ResponsiveEmbed
      id={"xxx"}
      src={`${GRAFANA_URL}/d/${url_params.dashboard_uid}/${
        url_params.dashboard_title
      }?orgId=1&var-bcv_id=${id}&${
        url_params.varname
      }=${completeness}&kiosk&inactive&refresh=10m`}
      frameBorder="0"
      ratio="1:1"
    />
    {/* </Segment> */}
  </React.Fragment>
);

ConceptMetrics.propTypes = {
  concept: PropTypes.object
};

const mapStateToProps = state => ({
  concept: state.concept
});

export default connect(mapStateToProps)(ConceptMetrics);
