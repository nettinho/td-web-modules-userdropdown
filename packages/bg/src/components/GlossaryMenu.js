import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { hideSidebar } from "@truedat/core/routines";
import { ActiveRoute } from "@truedat/core/components/ActiveRoute";
import { optionsDomains } from "../taxonomy/routines";
import { clearConceptQueryFilters } from "../concepts/routines";
import { clearFilterDomains } from "../taxonomy/routines";
import conceptRoutes from "../concepts/routes";
import taxonomyRoutes from "../taxonomy/routes";

export class GlossaryMenu extends React.Component {
  static propTypes = {
    hideSidebar: PropTypes.func,
    optionsDomains: PropTypes.func,
    clearConceptQueryFilters: PropTypes.func,
    clearFilterDomains: PropTypes.func,
    domainsPermissions: PropTypes.object,
    location: PropTypes.object
  };

  componentDidMount() {
    const { domainsPermissions, optionsDomains } = this.props;
    if (_.isEmpty(domainsPermissions)) {
      optionsDomains();
    }
  }

  componentDidUpdate() {
    const { clearConceptQueryFilters, clearFilterDomains } = this.props;
    const activeConcepts =
      ActiveRoute(location, conceptRoutes.CONCEPTS) ||
      ActiveRoute(location, conceptRoutes.CONCEPTS_PENDING);
    if (!activeConcepts) {
      clearConceptQueryFilters();
    }
    clearFilterDomains();
  }

  render() {
    const { hideSidebar, domainsPermissions, location } = this.props;
    const activeDomains = ActiveRoute(location, taxonomyRoutes.DOMAINS);
    const activeConcepts =
      ActiveRoute(location, conceptRoutes.CONCEPTS) ||
      ActiveRoute(location, conceptRoutes.CONCEPTS_PENDING);
    return (
      <Menu.Item
        header
        active={activeDomains || activeConcepts}
        name="glossary"
      >
        <Icon name="university" />
        <FormattedMessage id="navigation.glossary" />
        <Menu.Menu>
          {_.propEq("list", true)(domainsPermissions) && (
            <Menu.Item
              as={Link}
              to={taxonomyRoutes.DOMAINS}
              name="domains"
              active={activeDomains}
              onClick={hideSidebar}
            >
              <Icon name="sitemap" />
              <FormattedMessage id="navigation.glossary.taxonomy" />
            </Menu.Item>
          )}
          <Menu.Item
            as={Link}
            to={conceptRoutes.CONCEPTS}
            name="concepts"
            onClick={hideSidebar}
            active={activeConcepts}
          >
            <Icon name="tags" />
            <FormattedMessage id="navigation.glossary.concepts" />
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
    );
  }
}

const mapStateToProps = ({ domainsPermissions }) => ({ domainsPermissions });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      optionsDomains,
      hideSidebar,
      clearConceptQueryFilters,
      clearFilterDomains
    },
    dispatch
  )
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(GlossaryMenu);
