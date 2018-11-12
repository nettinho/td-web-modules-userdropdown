import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";
import { updateStructure } from "../routines";

export class StructureForm extends React.Component {
  static propTypes = {
    structure: PropTypes.object,
    structureUpdating: PropTypes.bool,
    updateStructure: PropTypes.func
  };

  constructor(props) {
    super(props);
    const { structure } = props;
    this.state = { structure, edit: false };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.structureUpdating && !this.props.structureUpdating) {
      this.setState({ edit: false, structure: this.props.structure });
    }
  }

  handleKeyDown(e) {
    if (e.key === "Escape") {
      this.setState({ edit: false, structure: this.props.structure });
    }
  }

  handleEdit(e) {
    this.setState({ edit: true });
    e.preventDefault();
  }

  handleChange(e, data) {
    e.preventDefault();
    const { name, value } = data;
    const { structure } = this.state;
    const nextStructure = Object.assign({}, structure, { [name]: value });
    this.setState({ structure: nextStructure });
  }

  handleSubmit() {
    const { structure } = this.state;
    this.props.updateStructure({ data_structure: structure });
  }

  render() {
    const { structureUpdating } = this.props;
    const { structure, edit } = this.state;
    if (edit) {
      return (
        <Form size="small">
          <Form.Group>
            <Form.Input
              autoComplete="off"
              name="description"
              value={structure.description}
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
              required
              inline
              focus
              action={{
                icon: "check",
                onClick: this.handleSubmit,
                loading: structureUpdating,
                disabled: structureUpdating || !structure.description
              }}
            />
          </Form.Group>
        </Form>
      );
    } else {
      return (
        <p onClick={this.handleEdit}>
          {structure.description || "No definition"}
        </p>
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateStructure }, dispatch)
});

const mapStateToProps = ({ structure, structureUpdating }) => ({
  structure: _.pick(["id", "description"])(structure),
  structureUpdating
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StructureForm);
