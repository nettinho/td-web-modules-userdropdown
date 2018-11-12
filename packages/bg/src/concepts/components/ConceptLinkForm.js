import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { Button, Dropdown, Form, Segment, Table } from "semantic-ui-react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import { linkConcept, fetchConceptLinkFields } from "../routines";
import {
  getOus,
  getOuSystems,
  getOuSystemGroups,
  getOuSystemGroupStructures,
  getOuSystemGroupStructureFields
} from "../selectors";

const initialState = {
  structure_id: -1,
  field_id: -1,
  ou: "",
  system: "",
  group: "",
  structure: "",
  field: ""
};

const dependentFields = {
  ou: {
    structure_id: -1,
    field_id: -1,
    system: "",
    group: "",
    structure: "",
    field: ""
  },
  system: {
    structure_id: -1,
    field_id: -1,
    group: "",
    structure: "",
    field: ""
  },
  group: { structure_id: -1, field_id: -1, structure: "", field: "" },
  structure: { field_id: -1, field: "" },
  field: {}
};

const isFieldDisabled = optionsList =>
  _.isNil(optionsList) || _.isEmpty(optionsList);
export class ConceptLinkForm extends React.Component {
  static propTypes = {
    linkConcept: PropTypes.func.isRequired,
    ous: PropTypes.array,
    ouSystems: PropTypes.object,
    ouSystemGroups: PropTypes.object,
    ouSystemGroupStructures: PropTypes.object,
    ouSystemGroupStructureFields: PropTypes.array,
    fetchConceptLinkFields: PropTypes.func,
    concept_id: PropTypes.number,
    business_concept_id: PropTypes.number,
    resource_type: PropTypes.string,
    history: PropTypes.object,
    intl: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field, { data }) {
    const { value, options } = data;
    const depFields = dependentFields[field];
    let nextState;
    if (field == "structure") {
      const { text } = _.find(({ value: v }) => v == value)(options);
      nextState = Object.assign(
        {},
        { [field]: text },
        { structure_id: value },
        depFields
      );
    } else if (field == "field") {
      const { text } = _.find(({ value: v }) => v == value)(options);
      nextState = Object.assign(
        {},
        { [field]: text },
        { field_id: value },
        depFields
      );
    } else {
      nextState = Object.assign({}, { [field]: value }, depFields);
    }

    this.setState(nextState);
    if (field == "structure") {
      const { concept_id, fetchConceptLinkFields } = this.props;
      fetchConceptLinkFields({ concept_id, structure_id: value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.linkConcept({
      id: this.props.concept_id,
      resource_id: this.props.business_concept_id,
      resource_type: this.props.resource_type,
      field: this.state
    });
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { history } = this.props;

    const {
      conceptLinkFieldsLoading,
      conceptLinkStructuresLoading,
      ous,
      ouSystems,
      ouSystemGroups,
      ouSystemGroupStructures,
      ouSystemGroupStructureFields
    } = this.props;

    const {
      ou,
      system,
      group,
      structure,
      field,
      field_id,
      structure_id
    } = this.state;
    const disabled = !(ou && system && group && structure && field);

    let systems = ou ? ouSystems[ou] : [];
    let groups = ou && system ? ouSystemGroups[ou][system] : [];
    let structures =
      ou && system && group ? ouSystemGroupStructures[ou][system][group] : [];
    let fields =
      ou && system && group && structure ? ouSystemGroupStructureFields : [];

    return (
      <Segment attached="bottom">
        <Form
          loading={conceptLinkStructuresLoading || conceptLinkFieldsLoading}
        >
          <Form.Group widths="equal">
            <Form.Dropdown
              disabled={isFieldDisabled(ous)}
              placeholder={formatMessage({ id: "conceptLink.ou.placeholder" })}
              label={formatMessage({ id: "conceptLink.ou" })}
              search
              selection
              options={ous.map(({ text, value }, i) => ({
                key: i,
                text,
                value
              }))}
              onChange={(event, data) =>
                this.handleChange("ou", { event, data })
              }
              value={ou}
            />
            <Form.Dropdown
              disabled={isFieldDisabled(systems)}
              placeholder={formatMessage({
                id: "conceptLink.system.placeholder"
              })}
              label={formatMessage({ id: "conceptLink.system" })}
              search
              selection
              options={systems.map(({ text, value }, i) => ({
                key: i,
                text,
                value
              }))}
              onChange={(event, data) =>
                this.handleChange("system", { event, data })
              }
              value={system}
            />
            <Form.Dropdown
              disabled={isFieldDisabled(groups)}
              placeholder={formatMessage({
                id: "conceptLink.group.placeholder"
              })}
              label={formatMessage({ id: "conceptLink.group" })}
              search
              selection
              options={groups.map(({ text, value }, i) => ({
                key: i,
                text,
                value
              }))}
              onChange={(event, data) =>
                this.handleChange("group", { event, data })
              }
              value={group}
            />
            <Form.Dropdown
              disabled={isFieldDisabled(structures)}
              placeholder={formatMessage({
                id: "conceptLink.structure.placeholder"
              })}
              label={formatMessage({ id: "conceptLink.structure" })}
              search
              selection
              options={structures.map(({ text, value }, i) => ({
                key: i,
                text,
                value
              }))}
              onChange={(event, data) =>
                this.handleChange("structure", { event, data })
              }
              value={structure_id}
            />
          </Form.Group>
          <Form.Dropdown
            disabled={isFieldDisabled(fields)}
            placeholder={formatMessage({ id: "conceptLink.field.placeholder" })}
            label={formatMessage({ id: "conceptLink.field" })}
            search
            scrolling
            selection
            options={fields.map(({ text, value }, i) => ({
              key: i,
              text,
              value
            }))}
            onChange={(event, data) =>
              this.handleChange("field", { event, data })
            }
            value={field_id}
          />
          <Button.Group>
            <Button
              primary
              content={<FormattedMessage id="actions.create" />}
              disabled={disabled}
              onClick={this.handleSubmit}
            />
            <Button
              default
              onClick={() => history.goBack()}
              content={<FormattedMessage id="actions.cancel" />}
            />
          </Button.Group>
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  ous: getOus(state),
  ouSystems: getOuSystems(state),
  ouSystemGroups: getOuSystemGroups(state),
  ouSystemGroupStructures: getOuSystemGroupStructures(state),
  ouSystemGroupStructureFields: getOuSystemGroupStructureFields(state),
  concept_id: state.concept.id,
  business_concept_id: state.concept.business_concept_id,
  conceptLinkStructures: state.conceptLinkStructures,
  conceptLinkStructuresLoading: state.conceptLinkStructuresLoading,
  conceptLinkFields: state.conceptLinkFields,
  conceptLinkFieldsLoading: state.conceptLinkFieldsLoading
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ linkConcept, fetchConceptLinkFields }, dispatch)
});

export default compose(
  withRouter,
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConceptLinkForm);
