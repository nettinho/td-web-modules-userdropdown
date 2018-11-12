import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { linkTo } from "../routes";

export const ConceptLinkActions = ({ addLink }) => (
  <div style={{ float: "right" }}>
    {addLink && (
      <Button
        secondary
        as={Link}
        to={addLink}
        content={<FormattedMessage id="conceptLink.actions.create" />}
      />
    )}
  </div>
);

ConceptLinkActions.propTypes = {
  concept: PropTypes.object.isRequired
};

const mapStateToProps = ({ concept, conceptLinksActions }) => ({
  addLink:
    concept &&
    concept.id &&
    !_.isEmpty(conceptLinksActions) &&
    _.has("add_link")(conceptLinksActions)
      ? linkTo.CONCEPT_DATA_NEW(concept)
      : undefined
});

export default connect(mapStateToProps)(ConceptLinkActions);
