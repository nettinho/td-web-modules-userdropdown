import React from "react";
import PropTypes from "prop-types";
import { Table, Label } from "semantic-ui-react";
import { linkTo } from "../routes";
import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const RoleRow = ({ id, name, is_default, history }) => (
    <Table.Row
      className="selectable_row"
      onClick={() => {
        history.push(linkTo.ROLE({ id }));
      }}
    >
      <Table.Cell>
        { is_default ? (<React.Fragment>{name} <Label color="red"><FormattedMessage id="roles.default" /></Label></React.Fragment>) : name }
      </Table.Cell>
    </Table.Row>
  );

RoleRow.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  is_default: PropTypes.bool,
  history: PropTypes.object
};

export default withRouter(RoleRow);
