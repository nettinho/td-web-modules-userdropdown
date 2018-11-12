import React from "react";
import PropTypes from "prop-types";
import { Modal } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";

const actions = handleSubmit => [
  {
    key: "no",
    secondary: true,
    content: <FormattedMessage id="confirmation.no" />
  },
  {
    key: "yes",
    negative: true,
    content: <FormattedMessage id="confirmation.yes" />,
    onClick: handleSubmit
  }
];

const CoolHeader = ({ header, subHeader }) => (
  <Modal.Header>
    {header}
    {subHeader && <div className="subheader">{subHeader}</div>}
  </Modal.Header>
);
CoolHeader.propTypes = {
  header: PropTypes.any,
  subHeader: PropTypes.any
};

export const ConfirmModal = ({
  open,
  onOpen,
  icon,
  header,
  subHeader,
  content,
  onClose,
  handleSubmit,
  trigger,
  size
}) => (
  <React.Fragment>
    <Modal
      icon={icon}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      actions={actions(handleSubmit)}
      trigger={trigger}
      closeIcon
      size={size || "small"}
      header={<CoolHeader header={header} subHeader={subHeader} />}
      content={
        content.type === "string" ? (
          content
        ) : (
          <Modal.Content>{content}</Modal.Content>
        )
      }
    />
  </React.Fragment>
);

ConfirmModal.propTypes = {
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  icon: PropTypes.string,
  header: PropTypes.any,
  subHeader: PropTypes.any,
  content: PropTypes.any,
  handleSubmit: PropTypes.func,
  onClose: PropTypes.func,
  trigger: PropTypes.element,
  size: PropTypes.string
};

export default ConfirmModal;
