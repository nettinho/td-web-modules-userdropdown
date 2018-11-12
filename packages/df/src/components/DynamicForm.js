import _ from "lodash/fp";
import React from "react";
import { required, ruleRunner, run } from "@truedat/core/validation";
import FieldGroupSegment from "./FieldGroupSegment";

const initialState = {
  content: {},
  load_content: true
};

const getDefaultValue = ({ type }) => {
  switch(type){
    case "variable_list":
    case "variable_map_list":
      return []
    case "map_list":
      return null
    default:
      return ""
  }
}
const getTemplateGroups = ({ content }) =>
  _.isArray(content) ? _.toPairs(_.groupBy("group")(content)) : [];

export class DynamicForm extends React.Component {
  state = initialState;

  componentDidUpdate(prevProps) {
    const { template } = this.props;

    if (template !== prevProps.template) {
      if (!_.isEmpty(template)) {
        const { updatedContent } = this.props;
        const defaultContent = _.flow(
          _.propOr({}, "content"),
          _.keyBy("name"),
          _.mapValues("default")
        )(template);
        const content = { ...defaultContent, ...this.props.content };
        updatedContent(content, this.getValidations(content));
        this.setState({ content, load_content: false });
      }
    }
  }

  getValidations = contentValues => {
    const { template } = this.props;
    const content = _.propOr({}, "content")(template);

    const fieldsValidations = _.map(e => ruleRunner(e.name, e.label, required))(
      _.filter("required")(content)
    );
    const validationErrors = run(contentValues, fieldsValidations);

    return validationErrors;
  };

  handleChange = (e, { name, value }) => {
    e && e.preventDefault();

    const { updatedContent, content } = this.props;

    const newContent = { ...content, [name]: value };
    const validationErrors = this.getValidations(newContent);

    updatedContent(newContent, validationErrors);
  };

  render() {
    const { content, template } = this.props;

    const groups = getTemplateGroups(template);

    const groupsWithValues = groups.map(([name, groupFields]) => [
      name,
      groupFields.map(f => ({
        ...f,
        value: content[f.name] || getDefaultValue(f)
      }))
    ]);

    return (
      <React.Fragment>
        {groupsWithValues &&
          groupsWithValues.map(([name, fields], i) => (
            <FieldGroupSegment
              key={i}
              onFieldChange={this.handleChange}
              name={name}
              fields={fields}
              content={content}
              handleAddUrl={this.handleAddUrl}
              handleRemoveUrl={this.handleRemoveUrl}
            />
          ))}
      </React.Fragment>
    );
  }
}

export default DynamicForm;
