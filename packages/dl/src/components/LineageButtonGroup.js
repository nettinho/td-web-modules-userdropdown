import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import { compose } from "redux";
import { connect } from "react-redux";
import { injectIntl, FormattedMessage } from "react-intl";
import { IMPACT_VISUALIZATION, LINEAGE_VISUALIZATION } from "../constants";
import { redirectToVisualization, clearResourcesList } from "../actions";

const LineageButtonGroup = props => {
  const {
    handleVisualization,
    clearResourcesList,
    listSelectedResources
  } = props;
  const isListEmpty = list => {
    if (list.length > 0) return false;
    return true;
  };
  const disableButton = isListEmpty(listSelectedResources);

  return (
    <Form.Group widths="equal">
      <Button secondary onClick={clearResourcesList} disabled={disableButton}>
        <FormattedMessage id="navigation.lineage.clean" />
      </Button>
      <Button.Group>
        <Button
          primary
          disabled={disableButton}
          onClick={event =>
            handleVisualization(
              event,
              IMPACT_VISUALIZATION,
              listSelectedResources
            )
          }
        >
          <FormattedMessage id="navigation.lineage.impact" />
        </Button>
        <Button.Or />
        <Button
          primary
          disabled={disableButton}
          onClick={event =>
            handleVisualization(
              event,
              LINEAGE_VISUALIZATION,
              listSelectedResources
            )
          }
        >
          <FormattedMessage id="navigation.lineage.lineage" />
        </Button>
      </Button.Group>
    </Form.Group>
  );
};

LineageButtonGroup.propTypes = {
  clearResourcesList: PropTypes.func,
  handleVisualization: PropTypes.func,
  listSelectedResources: PropTypes.array
};

const mapStateToProps = ({ lineageResources }) => ({
  listSelectedResources: lineageResources.listSelectedResources
});

const mapDispatchToProps = dispatch => ({
  handleVisualization: (event, typeVisualization, listSelectedResources) => {
    event.preventDefault();
    if (listSelectedResources.length !== 0) {
      return dispatch(redirectToVisualization(typeVisualization));
    }
  },
  clearResourcesList: () => dispatch(clearResourcesList())
});

export default compose(
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LineageButtonGroup);
