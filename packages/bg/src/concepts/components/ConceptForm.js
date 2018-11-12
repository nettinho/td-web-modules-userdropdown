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
import { RichTextEditor } from "@truedat/core/components";
import { required, ruleRunner, run } from "@truedat/core/validation";
import { DynamicForm, TemplateSelector } from "@truedat/df/components";
import {
  fetchDomainTemplates,
  clearDomainTemplates
} from "@truedat/df/routines";
import {
  conceptAction,
  fetchDomainConcepts,
  clearDomainConcepts
} from "../routines";
import DomainSelector from "./DomainSelector";
import ParentConceptSelector from "./ParentConceptSelector";

const actionKey = "create";

const staticFields = ["name", "description"];

const initialState = {
  name: "",
  description: {},
  content: {},
  domain: null,
  load_content: true,
  showStaticErrors: false,
  showDynamicErrors: false,
  template: {},
  validationStaticErrors: {},
  validationDynamicErrors: {}
};

const fieldValidations = formatMessage => {
  return [
    ruleRunner(
      "domain",
      formatMessage({ id: "domain.selector.label" }),
      required
    ),
    ruleRunner("name", formatMessage({ id: "concepts.props.name" }), required),
    ruleRunner(
      "description",
      formatMessage({ id: "concepts.props.description" }),
      required
    )
  ];
};

export class ConceptForm extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    action: PropTypes.object,
    conceptAction: PropTypes.func,
    conceptActionLoading: PropTypes.string,
    fetchDomainConcepts: PropTypes.func,
    clearDomainConcepts: PropTypes.func,
    domains: PropTypes.array,
    parents: PropTypes.array,
    intl: PropTypes.object
  };

  state = initialState;

  componentWillUnmount() {
    const { clearDomainConcepts, clearDomainTemplates } = this.props;
    clearDomainTemplates();
    clearDomainConcepts();
  }

  handleDomainSelected = (e, { value }) => {
    const domain = value
      ? _.find(_.propEq("id", value))(this.props.domains)
      : {};
    const domain_id = domain.id;

    const { validationStaticErrors, showStaticErrors } = this.getValidations();

    this.setState({
      domain,
      domain_id,
      load_content: false,
      parent_id: null,
      validationStaticErrors,
      template: {},
      showStaticErrors
    });

    const { fetchDomainConcepts, fetchDomainTemplates } = this.props;
    fetchDomainTemplates({ domain_id });
    fetchDomainConcepts({ domain_id });
  };

  handleTemplateSelected = (e, data) => {
    const { value } = data;
    const template = value
      ? _.find(_.propEq("id", value))(this.props.templates)
      : {};
    const type = _.prop("name")(template);
    this.setState({ template, type });
  };

  handleOnParentConceptSearchChange = (e, data) => {
    const { searchQuery } = data;
    const { fetchDomainConcepts, clearDomainConcepts } = this.props;
    const { domain_id } = this.state;
    if (domain_id) {
      const query = _.isEmpty(searchQuery) ? undefined : searchQuery;
      fetchDomainConcepts({ domain_id, query });
    } else {
      clearDomainConcepts();
      this.setState({ parent_id: null });
    }
  };

  handleParentSelected = (e, { value }) => {
    this.setState({
      parent_id: value,
      load_content: true
    });
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
      "domain_id",
      "parent_id",
      "type",
      ...staticFields
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
    const {
      history,
      domains,
      action,
      conceptActionLoading,
      parents
    } = this.props;

    const {
      name,
      description,
      showStaticErrors,
      showDynamicErrors,
      domain_id,
      template,
      content
    } = this.state;

    const loading =
      action && action.href && conceptActionLoading === action.href;

    return (
      <React.Fragment>
        <Container as={Segment} text>
          <Header as="h2">
            <Icon name="book" />
            <Header.Content>
              <FormattedMessage id="concepts.actions.create" />
            </Header.Content>
          </Header>
          <Form
            loading={loading}
            warning={showStaticErrors || showDynamicErrors}
          >
            <DomainSelector
              onChange={this.handleDomainSelected}
              domains={domains}
            />
            <TemplateSelector
              selectedValue={template.id}
              onChange={this.handleTemplateSelected}
            />
            <ParentConceptSelector
              onChange={this.handleParentSelected}
              onSearchChange={this.handleOnParentConceptSearchChange}
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
              content={<FormattedMessage id="actions.create" />}
              disabled={!action}
            />
            <Button
              default
              onClick={() => history.goBack()}
              content={<FormattedMessage id="actions.cancel" />}
            />
          </Form>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  domains: state.domains,
  templates: state.domainTemplates,
  conceptActionLoading: state.conceptActionLoading,
  action: _.get(actionKey)(state.conceptsActions)
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      conceptAction,
      fetchDomainTemplates,
      clearDomainTemplates,
      fetchDomainConcepts,
      clearDomainConcepts
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
)(ConceptForm);
