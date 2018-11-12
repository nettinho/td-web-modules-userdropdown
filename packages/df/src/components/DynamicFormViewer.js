import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

import FieldGroupDetail from "./FieldGroupDetail";

const initialState = {};

export class DynamicFormViewer extends React.Component {
  static propTypes = {
    fieldValues: PropTypes.array
  };
  state = initialState;

  render() {
    const { fieldValues } = this.props;
    return (
      <React.Fragment>
        {fieldValues &&
          fieldValues.map(([groupName, fieldValues], i) => (
            <FieldGroupDetail key={i} {...{ groupName, fieldValues }} />
          ))}
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => ({
//   templates: findConceptTemplate(state),
//   default_template: findDefaultTemplate(state)
// });

// const mapDispatchToProps = dispatch => ({
//   ...bindActionCreators(
//     {
//       fetchDomainTemplates,
//       clearDomainTemplates
//     },
//     dispatch
//   )
// });

export default connect()(DynamicFormViewer);
// mapStateToProps,
// mapDispatchToProps
