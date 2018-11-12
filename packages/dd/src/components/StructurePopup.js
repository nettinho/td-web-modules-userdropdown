import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, Grid, Header, Popup } from "semantic-ui-react";
import { updateStructure } from "../routines";

const options = [
  { value: null, header: "No sensible", text: "Dato no susceptible a la LOPD" },
  {
    value: "1",
    header: "Nivel básico",
    text: "Datos de carácter personal"
  },
  {
    value: "2",
    header: "Nivel medio",
    text: "Datos de personalidad, hábitos de consumo, carácter, etc."
  },
  {
    value: "3",
    header: "Nivel alto",
    text:
      "Datos de ideología, afiliación sindical, religión, origen racial, salud , etc."
  }
];

const OptionCell = ({ header, text }) => (
  <Grid.Column textAlign="center">
    <Header as="h4">{header}</Header>
    <p>
      <small>{text}</small>
    </p>
  </Grid.Column>
);

OptionCell.propTypes = {
  header: PropTypes.string,
  text: PropTypes.string
};

const OptionButton = ({ onSelect }) => (
  <Grid.Column textAlign="center">
    <Button size="tiny" onClick={onSelect}>
      Select
    </Button>
  </Grid.Column>
);

OptionButton.propTypes = {
  onSelect: PropTypes.func
};

const StructurePopup = ({ id, children, updateStructure }) => (
  <Popup trigger={children} wide="very" hoverable position="bottom center">
    <Grid centered divided columns={4}>
      <Grid.Row>
        {options.map((o, i) => <OptionCell key={i} {...o} />)}
        {options.map((o, i) => (
          <OptionButton
            key={i}
            {...o}
            onSelect={() =>
              updateStructure({
                data_structure: { id, lopd: o.value }
              })
            }
          />
        ))}
      </Grid.Row>
    </Grid>
  </Popup>
);

StructurePopup.propTypes = {
  id: PropTypes.number,
  children: PropTypes.node,
  updateStructure: PropTypes.func
};

const mapStateToProps = ({ structure }) => _.pick(["id", "lopd"])(structure);

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateStructure }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StructurePopup);
