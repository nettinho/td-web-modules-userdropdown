import React from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";
import { compose } from "redux";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { filterDomains } from "../routines";

const DomainSearch = ({ handleFilterDomains, intl: { formatMessage } }) => (
  <Input
    onChange={handleFilterDomains}
    icon={{ name: "search", link: true }}
    placeholder={formatMessage({ id: "domains.search.placeholder" })}
  />
);

DomainSearch.propTypes = {
  handleFilterDomains: PropTypes.func,
  intl: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  handleFilterDomains: event => {
    const query = event.target.value;
    return dispatch(filterDomains({ query }));
  }
});

export default compose(
  injectIntl,
  connect(
    null,
    mapDispatchToProps
  )
)(DomainSearch);
