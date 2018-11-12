import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { downloadConcepts, uploadConcepts } from "../routines";
import routes from "../routes";
import ConceptsUploadButton from "./ConceptsUploadButton";

export const ConceptsActions = ({
  createUrl,

  conceptsDownloading,
  downloadConcepts
}) => (
  <div>
    <ConceptsUploadButton />
    {createUrl && (
      <Button
        style={{ float: "right" }}
        secondary
        as={Link}
        to={createUrl}
        content={<FormattedMessage id="concepts.actions.create" />}
      />
    )}
    <Button
      style={{ float: "right" }}
      secondary
      onClick={() => downloadConcepts()}
      loading={conceptsDownloading}
      content={<FormattedMessage id="concepts.actions.download" />}
    />
  </div>
);

ConceptsActions.propTypes = {
  conceptsDownloading: PropTypes.bool,
  createUrl: PropTypes.string,
  downloadConcepts: PropTypes.func
};

const mapStateToProps = ({
  conceptLoading,
  conceptActions,
  conceptsActions,
  conceptsDownloading
}) => ({
  createUrl:
    !conceptLoading &&
    _.isEmpty(conceptActions) &&
    _.has("create")(conceptsActions)
      ? routes.CONCEPTS_NEW
      : undefined,
  conceptsDownloading
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ downloadConcepts, uploadConcepts }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConceptsActions);
