import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";
import { updateStructureField } from "../routines";

export class StructureFieldForm extends React.Component {
  static propTypes = {
    structureField: PropTypes.object,
    structureFieldUpdating: PropTypes.bool,
    updateStructureField: PropTypes.func
  };

  constructor(props) {
    super(props);
    const { structureField } = props;
    this.state = { structureField, edit: false };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.structureFieldUpdating &&
      !this.props.structureFieldUpdating
    ) {
      this.setState({ edit: false, structureField: this.props.structureField });
    }
  }

  handleKeyDown(e) {
    if (e.key === "Escape") {
      this.setState({ edit: false, structureField: this.props.structureField });
    }
  }

  handleEdit(e) {
    this.setState({ edit: true });
    e.preventDefault();
  }

  handleChange(e, data) {
    e.preventDefault();
    const { name, value } = data;
    const { structureField } = this.state;
    const nextStructure = Object.assign({}, structureField, { [name]: value });
    this.setState({ structureField: nextStructure });
  }

  handleSubmit() {
    const { structureField } = this.state;
    this.props.updateStructureField({ data_field: structureField });
  }

  render() {
    const { structureFieldUpdating } = this.props;
    const { structureField, edit } = this.state;
    if (edit) {
      return (
        <Form size="small">
          <Form.Group>
            <Form.Input
              autoComplete="off"
              name="description"
              value={structureField.description}
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
              required
              inline
              focus
              action={{
                icon: "check",
                onClick: this.handleSubmit,
                loading: structureFieldUpdating,
                disabled: structureFieldUpdating || !structureField.description
              }}
            />
          </Form.Group>
        </Form>
      );
    } else {
      return (
        <p onClick={this.handleEdit}>
          {structureField.description || "No definition"}
        </p>
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateStructureField }, dispatch)
});

const mapStateToProps = ({ structureField, structureFieldUpdating }) => ({
  structureField: _.pick(["id", "description"])(structureField),
  structureFieldUpdating
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StructureFieldForm);
