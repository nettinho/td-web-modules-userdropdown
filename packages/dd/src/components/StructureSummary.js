import React from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";
import { connect } from "react-redux";
import StructurePopup from "./StructurePopup";
import StructureProperties from "./StructureProperties";
import StructureTabs from "./StructureTabs";

export const StructureSummary = ({ name, type, structureLoading }) =>
  structureLoading ? null : (
    <React.Fragment>
      <Header as="h2">
        <Header.Content>
          {name}
          <Header.Subheader>{type}</Header.Subheader>
        </Header.Content>
      </Header>
      <StructureProperties />
      <StructurePopup />
      <StructureTabs />
    </React.Fragment>
  );

StructureSummary.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  structureLoading: PropTypes.bool
};

const mapStateToProps = ({ structure, structureLoading }) => ({
  structureLoading,
  ...structure
});

export default connect(mapStateToProps)(StructureSummary);
