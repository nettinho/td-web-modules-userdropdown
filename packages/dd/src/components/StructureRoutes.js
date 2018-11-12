import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Segment } from "semantic-ui-react";
import { Alert } from "@truedat/core/components";
import routes from "../routes";
import StructureSummary from "./StructureSummary";
import StructureFields from "./StructureFields";
import Events from "./Events";

const StructureRoutes = ({ structureLoading, structure }) =>
  structureLoading ? null : structure && structure.id ? (
    <Fragment>
      <Segment>
        <Route path={routes.STRUCTURE} exact component={StructureSummary} />
        <Route path={routes.EVENTS} exact component={StructureSummary} />
        <Switch>
          <Route path={routes.STRUCTURE} exact component={StructureFields} />
          <Route path={routes.EVENTS} exact component={Events} />
        </Switch>
      </Segment>
    </Fragment>
  ) : (
    <Alert />
  );

StructureRoutes.propTypes = {
  structureLoading: PropTypes.bool,
  structure: PropTypes.object
};

const mapStateToProps = ({ structureLoading, structure }) => ({
  structureLoading,
  structure
});

export default connect(mapStateToProps)(StructureRoutes);
