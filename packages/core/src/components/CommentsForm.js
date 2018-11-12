import React from "react";
import PropTypes from "prop-types";
import { Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { compose } from "redux";
import { injectIntl } from "react-intl";
import { bindActionCreators } from "redux";
import { createComment } from "../routines";

class CommentsForm extends React.Component {
  static propTypes = {
    createComment: PropTypes.func,
    commentsResource: PropTypes.object,
    intl: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = { comment: "", enabledButton: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, data) {
    const { value: comment } = data;
    const enabledButton = comment ? true : false;
    this.setState({ comment, enabledButton });
    e.preventDefault();
  }

  handleSubmit(event) {
    const { comment } = this.state;
    const { commentsResource, createComment } = this.props;
    createComment({ comment: { ...commentsResource, content: comment } });
    this.setState({ comment: "", enabledButton: false });
    event.preventDefault();
  }

  render() {
    const { comment, enabledButton } = this.state;
    const {
      intl: { formatMessage }
    } = this.props;

    return (
      <Form reply onSubmit={this.handleSubmit}>
        <Form.TextArea value={comment} onChange={this.handleChange} />
        <Button
          content={formatMessage({ id: "comments.actions.new" })}
          labelPosition="left"
          icon="edit"
          primary
          disabled={!enabledButton}
        />
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ createComment }, dispatch)
});

export default compose(
  injectIntl,
  connect(
    null,
    mapDispatchToProps
  )
)(CommentsForm);
