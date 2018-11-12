import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import routes, { linkTo } from "../routes";

export const StructureCrumbs = ({ id, name, structureField }) =>
  name ? (
    <Breadcrumb>
      <Breadcrumb.Section as={Link} to={routes.STRUCTURES} active={false}>
        <FormattedMessage id="structures.crumbs.top" />
      </Breadcrumb.Section>
      <Breadcrumb.Divider icon="right angle" />
      {_.isEmpty(structureField) && (
        <Breadcrumb.Section active>{name}</Breadcrumb.Section>
      )}
      {!_.isEmpty(structureField) && (
        <React.Fragment>
          <Breadcrumb.Section
            as={Link}
            to={linkTo.STRUCTURE({ id })}
            active={false}
          >
            {name}
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>{structureField.name}</Breadcrumb.Section>
        </React.Fragment>
      )}
    </Breadcrumb>
  ) : null;

StructureCrumbs.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  structureField: PropTypes.object
};

const mapStateToProps = ({ structure, structureField }) => ({
  ...structure,
  structureField
});
export default connect(mapStateToProps)(StructureCrumbs);
