import React, { Fragment } from "react";
import { compose } from "redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Breadcrumb } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { injectIntl } from "react-intl";
import routes, { linkTo } from "../routes";
import { getAncestorDomains } from "../selectors";

const toParentRoute = linkTo.DOMAIN;

export const DomainCrumbs = ({
  parents,
  domain,
  actionCrumb,
  intl: { formatMessage }
}) => (
  <Breadcrumb>
    <Breadcrumb.Section as={Link} to={routes.DOMAINS} active={!domain}>
      <FormattedMessage id="navigation.glossary.taxonomy" />
    </Breadcrumb.Section>
    {parents.map((p, i) => (
      <Fragment key={i}>
        <Breadcrumb.Divider icon="right angle" />
        <Breadcrumb.Section key={i} as={Link} to={toParentRoute({ id: p.id })}>
          {p.name}
        </Breadcrumb.Section>
      </Fragment>
    ))}
    {domain &&
      domain.id && (
        <Fragment>
          <Breadcrumb.Divider icon="right angle" />
          {actionCrumb ? (
            <Breadcrumb.Section as={Link} to={toParentRoute({ id: domain.id })}>
              {domain.name}
            </Breadcrumb.Section>
          ) : (
            <Breadcrumb.Section active>{domain.name}</Breadcrumb.Section>
          )}
        </Fragment>
      )}
    {actionCrumb && (
      <Fragment>
        <Breadcrumb.Divider icon="right angle" />
        <Breadcrumb.Section active>
          {formatMessage({ id: actionCrumb })}
        </Breadcrumb.Section>
      </Fragment>
    )}
  </Breadcrumb>
);

DomainCrumbs.propTypes = {
  parents: PropTypes.array,
  domain: PropTypes.object
};

const mapStateToProps = state => ({
  domain: state.domain,
  parents: getAncestorDomains(state)
});

export default compose(
  injectIntl,
  connect(mapStateToProps)
)(DomainCrumbs);
