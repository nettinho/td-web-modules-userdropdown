export const mapActionProps = {
  publish: {
    primary: true
  },
  version: {
    secondary: true
  },
  send_for_approval: {
    primary: true
  },
  reject: {
    negative: true
  }
};

export const mapStatusColor = {
  deprecated: "grey",
  draft: "olive",
  pending_approval: "teal",
  published: "green",
  rejected: "red",
  versioned: "yellow"
};
