import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Header, Label, List, Segment } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { linkTo } from "../routes";

const Bold = ({ children }) => (
  <div style={{ fontWeight: "bold", minWidth: "100px" }}>{children}</div>
);

const Parent = ({ id, name }) => (
  <List.Item style={{ marginBottom: "5px" }}>
    <List.Content style={{ display: "inline-flex" }}>
      <Bold>
        <FormattedMessage id="concept.props.parent" />:
      </Bold>
      <Label as={Link} to={linkTo.CONCEPT({ id: id })}>
        {name}
      </Label>
    </List.Content>
  </List.Item>
);

const Children = ({ value }) => (
  <List.Item style={{ marginBottom: "5px" }}>
    <List.Content style={{ display: "inline-flex" }}>
      <Bold>
        <FormattedMessage id={"concept.props.children"} />:
      </Bold>
      <List>{value.map((child, i) => <Child key={i} {...child} />)}</List>
    </List.Content>
  </List.Item>
);

const Child = ({ id, name }) => (
  <List.Item>
    <Label as={Link} to={linkTo.CONCEPT({ id })}>
      {name}
    </Label>
  </List.Item>
);

Parent.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string
};

Children.propTypes = {
  value: PropTypes.array
};

Child.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string
};

export const ConceptHierarchy = ({ concept: { parent, children } }) => {
  if (_.isEmpty(parent) && _.isEmpty(children)) return null;
  return (
    <React.Fragment>
      <Segment>
        <Header as="h3" dividing>
          <FormattedMessage id="concepts.hierarchy" />
        </Header>
        {!_.isEmpty(parent) && <Parent {...parent} />}
        {!_.isEmpty(children) && <Children value={children} />}
      </Segment>
    </React.Fragment>
  );
};

ConceptHierarchy.propTypes = {
  concept: PropTypes.object
};

const mapStateToProps = ({ concept }) => ({ concept });

export default connect(mapStateToProps)(ConceptHierarchy);
