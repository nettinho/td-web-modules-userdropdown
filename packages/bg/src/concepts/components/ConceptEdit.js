import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Container,
  Form,
  Header,
  Icon,
  Segment,
  Message
} from "semantic-ui-react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import { required, ruleRunner, run } from "@truedat/core/validation";
import { RichTextEditor } from "@truedat/core/components";
import { DynamicForm } from "@truedat/df/components";
import {
  fetchDomainTemplates,
  clearDomainTemplates
} from "@truedat/df/routines";
import {
  conceptAction,
  fetchDomainConcepts,
  clearDomainConcepts
} from "../routines";
import ParentConceptSelector from "./ParentConceptSelector";

const staticFields = ["parent_id", "type", "name", "description"];

const actionKey = "update";

const fieldValidations = formatMessage => {
  return [
    ruleRunner("name", formatMessage({ id: "concepts.props.name" }), required),
    ruleRunner(
      "description",
      formatMessage({ id: "concepts.props.description" }),
      required
    )
  ];
};

const initialState = {
  parent_id: null,
  type: "",
  name: "",
  description: {},
  template: {},
  validationStaticErrors: {},
  validationDynamicErrors: {},
  showStaticErrors: false,
  showDynamicErrors: false
};

export class ConceptEdit extends React.Component {
  static propTypes = {
    action: PropTypes.object,
    conceptAction: PropTypes.func.isRequired,
    conceptActionLoading: PropTypes.string,
    concept: PropTypes.object,
    history: PropTypes.object,
    intl: PropTypes.object
  };

  state = initialState;

  componentDidMount() {
    this.setState({ content: {}, template: {} });
    this.setStateFromProps({});
  }

  componentDidUpdate(prevProps) {
    this.setStateFromProps(prevProps);
  }

  componentWillUnmount() {
    const { clearDomainConcepts, clearDomainTemplates } = this.props;
    clearDomainConcepts();
    clearDomainTemplates();
  }

  setStateFromProps(prevProps) {
    if (
      _.isUndefined(this.state.content) &&
      !_.isUndefined(this.props.concept.content)
    ) {
      const {
        content,
        domain,
        parent_id,
        name,
        description,
        type
      } = this.props.concept;
      this.setState({ content: content, parent_id, name, description, type });
      const { fetchDomainConcepts, fetchDomainTemplates } = this.props;
      const domain_id = domain.id;
      const concept_id = parent_id;
      fetchDomainTemplates({ domain_id });
      fetchDomainConcepts({ concept_id, domain_id });
    }

    const { templates } = this.props;
    if (templates !== prevProps.templates && !_.isEmpty(templates)) {
      const { type, template } = this.state;
      if (!_.isEmpty(templates) && type && _.isEmpty(template)) {
        const template =
          templates && type
            ? _.defaultTo({}, _.find(_.propEq("name", type))(templates))
            : {};
        this.setState({ template });
      }
    }
  }

  handleOnParentConceptSearchChange = (e, data) => {
    const { searchQuery } = data;
    const { concept, fetchDomainConcepts } = this.props;
    if (!_.isEmpty(concept)) {
      const query = _.isEmpty(searchQuery) ? undefined : searchQuery;
      const domain_id = concept.domain.id;
      fetchDomainConcepts({ domain_id, query });
    }
  };

  handleParentConceptChange = (e, data) => {
    const { value } = data;
    this.handleChange(null, { name: "parent_id", value });
  };

  getValidations = () => {
    const {
      intl: { formatMessage }
    } = this.props;
    const validationStaticErrors = run(
      { ...this.state },
      fieldValidations(formatMessage)
    );
    const showStaticErrors = Object.keys(validationStaticErrors).length !== 0;
    return { validationStaticErrors, showStaticErrors };
  };

  handleEditorChange = ({ value }) => {
    this.handleChange(null, { name: "description", value });
  };

  handleChange = (e, { name, value }) => {
    e && e.preventDefault();

    if (staticFields.includes(name)) {
      const validationForm = { ...this.state };
      validationForm[name] = value;
      const {
        validationStaticErrors,
        showStaticErrors
      } = this.getValidations();
      this.setState({
        [name]: value,
        validationStaticErrors,
        showStaticErrors
      });
    }
  };

  updatedDfContent = (content, validations) => {
    const validationDynamicErrors = { ...validations };
    const showDynamicErrors = Object.keys(validationDynamicErrors).length !== 0;
    this.setState({
      content,
      validationDynamicErrors,
      showDynamicErrors
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { action, conceptAction } = this.props;
    const business_concept_version = _.pick([
      "content",
      "parent_id",
      "description",
      "name",
      "type"
    ])(this.state);
    conceptAction({
      action: actionKey,
      ...action,
      business_concept_version
    });
  };

  listErrors = ({ validationStaticErrors, validationDynamicErrors }) =>
    Object.entries({
      ...validationStaticErrors,
      ...validationDynamicErrors
    }).map(x => x[1]);

  render() {
    const { formatMessage } = this.props.intl;
    const { history, conceptActionLoading, action, parents } = this.props;

    const loading =
      action && action.href && conceptActionLoading === action.href;
    const {
      content,
      parent_id,
      name,
      description,
      showStaticErrors,
      showDynamicErrors,
      template
    } = this.state;
    if (_.isUndefined(content) || _.isEmpty(template)) {
      return null;
    }

    return (
      <React.Fragment>
        <Container as={Segment} text>
          <Header as="h2">
            <Icon name="book" />
            <Header.Content>
              <FormattedMessage id="concepts.header.edit" />
            </Header.Content>
          </Header>
          <Form
            loading={loading}
            warning={showStaticErrors || showDynamicErrors}
          >
            <ParentConceptSelector
              onChange={this.handleParentConceptChange}
              onSearchChange={this.handleOnParentConceptSearchChange}
              value={parent_id}
            />
            <Form.Input
              label={formatMessage({ id: "concepts.props.name" })}
              name="name"
              value={name}
              onChange={this.handleChange}
              required
            />
            <RichTextEditor
              label={formatMessage({ id: "concepts.props.description" })}
              name="description"
              value={description}
              onChange={this.handleEditorChange}
              required
            />

            <DynamicForm
              template={template}
              updatedContent={this.updatedDfContent}
              content={content}
            />

            <Message
              warning
              header={formatMessage({ id: "validation.header.message.error" })}
              list={this.listErrors(this.state)}
            />
            <Button
              primary
              onClick={this.handleSubmit}
              disabled={loading}
              content="Update"
            />
            <Button default onClick={() => history.goBack()} content="Cancel" />
          </Form>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  concept: state.concept,
  conceptActionLoading: state.conceptActionLoading,
  templates: state.domainTemplates,
  action: _.get(actionKey)(state.conceptActions)
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      conceptAction,
      fetchDomainConcepts,
      clearDomainConcepts,
      fetchDomainTemplates,
      clearDomainTemplates
    },
    dispatch
  )
});

export default compose(
  withRouter,
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConceptEdit);
