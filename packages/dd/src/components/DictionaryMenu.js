import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { hideSidebar } from "@truedat/core/routines";
import { ActiveRoute } from "@truedat/core/components/ActiveRoute";
import dictionaryRoutes from "../routes";
import { clearStructureQueryFilters } from "../routines";

export class DictionaryMenu extends React.Component {
  static propTypes = {
    hideSidebar: PropTypes.func,
    clearStructureQueryFilters: PropTypes.func,
    location: PropTypes.object
  };

  componentDidUpdate() {
    const { clearStructureQueryFilters } = this.props;
    const activeStructures = ActiveRoute(location, dictionaryRoutes.STRUCTURES);
    if (!activeStructures) {
      clearStructureQueryFilters();
    }
  }

  render() {
    const { hideSidebar, location } = this.props;
    return (
      <Menu.Item
        header
        name="dictionary"
        active={ActiveRoute(location, dictionaryRoutes.STRUCTURES)}
      >
        <Icon name="book" />
        <FormattedMessage id="navigation.dictionary" />
        <Menu.Menu>
          <Menu.Item
            as={Link}
            to={dictionaryRoutes.STRUCTURES}
            name="dictionary_structure"
            onClick={hideSidebar}
            active={ActiveRoute(location, dictionaryRoutes.STRUCTURES)}
          >
            <Icon name="list layout" />
            <FormattedMessage id="navigation.dictionary.structures" />
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ hideSidebar, clearStructureQueryFilters }, dispatch)
});

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(DictionaryMenu);
