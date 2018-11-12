import React from "react";
import { shallow } from "enzyme";

/**
 * Equivalent to enzyme's 'shallow' method.
 * @param {string} node React Component that requires react-intl.
 * @return {object}
 */
export const shallowWithIntl = node => {
  const intl = {
    formatMessage: ({ id }) => id
  };
  return shallow(React.cloneElement(node, { intl }), { context: { intl } });
};
