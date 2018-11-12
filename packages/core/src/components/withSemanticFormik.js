import React from "react";
import { withFormik } from "formik";

// https://github.com/jaredpalmer/formik/issues/148#issuecomment-335400844
// https://codesandbox.io/s/2022n8ol1r

export const withSemanticFormik = props => WrappedComponent => {
  return withFormik(props)(
    /* eslint-disable */
    class extends React.Component {
      handleBlur = (event, data) => {
        if (data) {
          this.setValue(data);
        } else {
          this.props.setFieldTouched(
            event.target.name || this.props.name,
            true
          );
        }
      };

      handleChange = (event, data) => {
        if (data && data.name) {
          this.props.setFieldValue(data.name, data.value);
        }
      };

      render() {
        return (
          <WrappedComponent
            {...this.props}
            handleBlur={this.handleBlur}
            handleChange={this.handleChange}
          />
        );
      }
    }
    /* eslint-enable */
  );
};
