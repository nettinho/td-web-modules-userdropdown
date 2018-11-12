import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Header } from "semantic-ui-react";
import { bindActionCreators, compose } from "redux";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addDomainMember } from "../routines";

const toOption = (t, i) => ({ key: i, text: t, value: t });

const roleOptions = roles =>
  _.flow(
    _.map("name"),
    _.filter(_.isString),
    _.uniq,
    _.sortBy(_.toLower),
    _.map.convert({ cap: false })(toOption)
  )(roles);

const toPrincipalOption = (t, i) => ({
  key: i,
  text: t.name,
  value: t.id,
  content: (
    <Header as="h5" icon={t.icon} content={t.name} subheader={t.description} />
  )
});

const principalOptions = principals =>
  _.flow(
    _.sortBy(
      _.flow(
        _.get("name"),
        _.toLower
      )
    ),
    _.map.convert({ cap: false })(toPrincipalOption)
  )(principals);

const normalize = _.flow(
  _.toLower,
  _.deburr
);
const matches = q => _.find(s => s.includes(q));
const selection = _.flow(
  _.at(["text", "content.props.subheader"]),
  _.map(normalize)
);
const optionMatches = q => o => matches(q)(selection(o));

const principalSearch = (options, query) => {
  return _.filter(optionMatches(normalize(query)))(options);
};

export class AddMemberForm extends React.Component {
  static propTypes = {
    domain: PropTypes.object,
    member: PropTypes.object,
    history: PropTypes.object,
    isSubmitting: PropTypes.bool,
    principals: PropTypes.array,
    roles: PropTypes.array,
    addDomainMember: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const defaults = { id: "", role: "" };
    const member = Object.assign({}, defaults, props.member);
    const touched = false;
    this.state = { member, touched };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(event, data) {
    event.preventDefault();
    const { name, value } = data;
    const member = Object.assign({}, this.state.member, { [name]: value });
    this.setState({ member, touched: true });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { member } = this.state;
    const [principal_type, principal_id] = _.split(":")(member.id);
    const acl_entry = {
      role_name: member.role,
      resource_type: "domain",
      resource_id: this.props.domain.id,
      principal_type,
      principal_id: _.toNumber(principal_id)
    };
    this.props.addDomainMember({ acl_entry });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.goBack();
  }

  render() {
    const {
      isSubmitting,
      principals,
      roles,
      intl: { formatMessage }
    } = this.props;
    const { member } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Dropdown
          name="id"
          label={formatMessage({ id: "domain.member" })}
          basic
          onChange={this.handleChange}
          value={member.id}
          placeholder={formatMessage({ id: "domain.member" })}
          options={principals}
          search={principalSearch}
          selection
        />
        <Form.Dropdown
          name="role"
          label={formatMessage({ id: "domain.role" })}
          basic
          onChange={this.handleChange}
          value={member.role}
          placeholder={formatMessage({ id: "domain.role" })}
          options={roles}
          search
          selection
        />
        <Button
          type="submit"
          primary
          loading={isSubmitting}
          disabled={isSubmitting || !this.state.touched}
        >
          {formatMessage({ id: "domain.actions.add_member" })}
        </Button>
        <Button onClick={this.handleCancel}>
          {formatMessage({ id: "domain.actions.cancel" })}
        </Button>
      </Form>
    );
  }
}

const principals = (groups, users) =>
  _.concat(
    _.map(({ id, name }) => ({ id: `group:${id}`, name, icon: "group" }))(
      groups
    ),
    _.map(({ id, user_name, full_name }) => ({
      id: `user:${id}`,
      name: user_name,
      description: full_name,
      icon: "user"
    }))(users)
  );

const mapStateToProps = ({
  domain,
  groups,
  users,
  roles,
  domainMemberSaving
}) => ({
  domain: domain,
  principals: principalOptions(principals(groups, users)),
  roles: roleOptions(roles),
  isSubmitting: domainMemberSaving
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ addDomainMember }, dispatch)
});

export default compose(
  withRouter,
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AddMemberForm);
