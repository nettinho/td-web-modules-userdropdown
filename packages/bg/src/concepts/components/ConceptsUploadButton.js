import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { UploadModal } from "@truedat/core/components";
import { AdminRole } from "@truedat/auth/components";
import { uploadConcepts } from "../routines";
import routes from "../routes";

const uploadAction = {
  method: "POST",
  href: routes.CONCEPTS_UPLOAD
};

export const ConceptsUploadButton = ({ uploadConcepts, loading }) => (
  <React.Fragment>
    <UploadModal
      icon="upload"
      trigger={
        <Button
          style={{ float: "right" }}
          icon="upload"
          loading={loading}
          content={<FormattedMessage id="concepts.actions.upload" />}
        />
      }
      header={
        <FormattedMessage id="concepts.actions.upload.confirmation.header" />
      }
      content={
        <FormattedMessage id="concepts.actions.upload.confirmation.content" />
      }
      handleSubmit={data =>
        uploadConcepts({
          action: "upload",
          data,
          ...uploadAction
        })
      }
    />
  </React.Fragment>
);

ConceptsUploadButton.propTypes = {
  uploadConcepts: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = ({ uploadConceptsFile: { loading } }) => ({
  loading
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ uploadConcepts }, dispatch)
});

export default compose(
  AdminRole,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConceptsUploadButton);
