import Popup from "semantic-ui-react";

class MyPopup extends Popup {
  handleOpen = e => {
    let {
      top,
      bottom,
      left,
      right,
      width,
      height
    } = e.currentTarget.getBoundingClientRect();
    const { mountNode } = this.props;

    if (mountNode) {
      const mountNodeTop = mountNode.getBoundingClientRect().top;
      const mountNodeOffset = -mountNodeTop + mountNode.scrollTop;

      top += mountNodeOffset;
      bottom += mountNodeOffset;
    }

    this.coords = { top, bottom, left, right, width, height };

    const { onOpen } = this.props;
    if (onOpen) onOpen(e, this.props);
  };
}

export default MyPopup;
