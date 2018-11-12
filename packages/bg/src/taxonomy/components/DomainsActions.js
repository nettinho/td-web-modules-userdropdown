import _ from "lodash/fp";
import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Input } from "semantic-ui-react";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import routes from "../routes";
import { filterDomains } from "../routines";

export const DomainsActions = ({
  intl: { formatMessage },
  handleFilterDomains,
  createUrl
}) => (
  <React.Fragment>
    <Input
      onChange={handleFilterDomains}
      icon={{ name: "search", link: true }}
      placeholder={formatMessage({ id: "domains.search.placeholder" })}
    />
    {createUrl && (
      <Button
        style={{ float: "right" }}
        secondary
        content={formatMessage({ id: "domains.actions.create" })}
        icon="cube"
        as={Link}
        to={createUrl}
      />
    )}
  </React.Fragment>
);

DomainsActions.propTypes = {
  intl: PropTypes.object,
  handleFilterDomains: PropTypes.func,
  createUrl: PropTypes.string
};

const mapStateToProps = ({ domainsActions }) => ({
  createUrl:
    !_.isEmpty(domainsActions) && _.has("create")(domainsActions)
      ? routes.DOMAINS_NEW
      : undefined
});

const mapDispatchToProps = dispatch => ({
  handleFilterDomains: event => {
    const query = event.target.value;
    return dispatch(filterDomains({ query }));
  }
});

export default compose(
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DomainsActions);
