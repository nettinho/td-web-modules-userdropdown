import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb } from "semantic-ui-react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import routes, { linkTo } from "../routes";

export const ConceptCrumbs = ({ name, conceptAction, id }) =>
  name || conceptAction ? (
    <Breadcrumb>
      <Breadcrumb.Section as={Link} to={routes.CONCEPTS} active={false}>
        <FormattedMessage id="concepts.crumbs.top" />
      </Breadcrumb.Section>
      {name && (
        <React.Fragment>
          <Breadcrumb.Divider icon="right angle" />
          {conceptAction ? (
            <Breadcrumb.Section
              as={Link}
              to={linkTo.CONCEPT({ id })}
              active={false}
            >
              {name}
            </Breadcrumb.Section>
          ) : (
            <Breadcrumb.Section active>{name}</Breadcrumb.Section>
          )}
        </React.Fragment>
      )}

      {conceptAction && (
        <React.Fragment>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>
            <FormattedMessage id={conceptAction} />
          </Breadcrumb.Section>
        </React.Fragment>
      )}
    </Breadcrumb>
  ) : null;

ConceptCrumbs.propTypes = {
  name: PropTypes.string,
  conceptAction: PropTypes.string,
  id: PropTypes.number
};

const mapStateToProps = ({ concept }) => ({ ...concept });
export default compose(connect(mapStateToProps))(ConceptCrumbs);
