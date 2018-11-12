import React from "react";
import PropTypes from "prop-types";
import { Header, Container, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import StructureFieldProperties from "./StructureFieldProperties";
import StructureFieldForm from "./StructureFieldForm";

export const StructureField = ({ name, structureFieldLoading }) =>
  structureFieldLoading ? null : (
    <React.Fragment>
      <Container as={Segment} text>
        <Header as="h2">
          <Header.Content>{name}</Header.Content>
        </Header>
        <StructureFieldForm />
        <StructureFieldProperties />
      </Container>
    </React.Fragment>
  );

StructureField.propTypes = {
  name: PropTypes.string,
  structureFieldLoading: PropTypes.bool
};

const mapStateToProps = ({ structureField, structureFieldLoading }) => ({
  structureFieldLoading,
  ...structureField
});

export default connect(mapStateToProps)(StructureField);
