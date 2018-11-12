import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment, Header } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { RichTextEditor } from "@truedat/core/components";
import { DynamicFormViewer } from "@truedat/df/components";
import { getFieldValues } from "../selectors";

export const ConceptDetails = ({ concept, fieldValues }) => (
  <React.Fragment>
    <Segment attached="bottom">
      <Header as="h3">
        <FormattedMessage id="concepts.props.description" />
      </Header>
      <RichTextEditor readOnly value={concept.description} />
      <DynamicFormViewer fieldValues={fieldValues} />
    </Segment>
  </React.Fragment>
);

ConceptDetails.propTypes = {
  concept: PropTypes.object,
  fieldValues: PropTypes.array
};

const mapStateToProps = state => ({
  concept: state.concept,
  fieldValues: getFieldValues(state)
});

export default connect(mapStateToProps)(ConceptDetails);
