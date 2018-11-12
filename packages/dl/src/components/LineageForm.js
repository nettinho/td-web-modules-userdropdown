import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Alert } from "@truedat/core/components";
import {
  retrieveNodesById,
  setSelectedResourcesList,
  cleanState
} from "../actions";
import routes from "../routes";
import SelectRow from "./SelectRow";
import LineageButtonGroup from "./LineageButtonGroup";

class LineageForm extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.mapIdsToQueryString = this.mapIdsToQueryString.bind(this);
  }

  componentDidMount() {
    // we don't have the uuid nor the currentLevel while loading the view for
    // the first time
    if (this.props.listSelectElements.length === 0) {
      this.props.retrieveNodesById(undefined, undefined);
    }
  }

  componentWillUnmount() {
    this.props.cleanState();
  }

  handleChange(event, data, currentLevel) {
    let uuidSelectedElement = data.value;
    let targetId = data.id;
    let selectedElement = this.props.listSelectElements.find(
      d => d.key === targetId
    );

    if (!selectedElement.bottomLevel) {
      this.props.retrieveNodesById(uuidSelectedElement, parseInt(currentLevel));
    } else {
      this.props.setSelectedResourcesList(data.value);
    }
  }

  mapIdsToQueryString() {
    return this.props.listSelectedResources.join(",");
  }

  render() {
    const {
      isLoading,
      listSelectElements,
      redirectToVisualization,
      typeVisualization,
      message
    } = this.props;

    if (message.error) return <Alert />;

    if (redirectToVisualization) {
      return (
        <Redirect
          push
          to={
            routes.LINEAGE_VISUALIZATION +
            "?uuids=" +
            this.mapIdsToQueryString() +
            "&type_analysis=" +
            typeVisualization
          }
        />
      );
    }

    return (
      <Form loading={isLoading}>
        {listSelectElements.map((option, i) => {
          return (
            <SelectRow
              key={i}
              index={i}
              row={option}
              handleChange={(event, data) => this.handleChange(event, data, i)}
            />
          );
        })}
        <LineageButtonGroup />
      </Form>
    );
  }
}

LineageForm.propTypes = {
  listSelectElements: PropTypes.array,
  listSelectedResources: PropTypes.array,
  setSelectedResourcesList: PropTypes.func,
  retrieveNodesById: PropTypes.func,
  isLoading: PropTypes.bool,
  redirectToVisualization: PropTypes.bool,
  typeVisualization: PropTypes.string,
  message: PropTypes.object,
  cleanState: PropTypes.func
};

const mapStateToProps = ({ lineageForm, lineageResources, message }) => ({
  isLoading: lineageForm.isLoading,
  listSelectElements: lineageForm.listSelectElements,
  listSelectedResources: lineageResources.listSelectedResources,
  redirectToVisualization: lineageResources.redirectToVisualization,
  typeVisualization: lineageResources.typeVisualization,
  message: message
});

const mapDispatchToProps = dispatch => ({
  retrieveNodesById: (uuidElement, currentLevel) =>
    dispatch(retrieveNodesById(uuidElement, currentLevel)),
  setSelectedResourcesList: listUuids =>
    dispatch(setSelectedResourcesList(listUuids)),
  cleanState: () => dispatch(cleanState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LineageForm);
