import React from "react";
import { shallowWithIntl } from "intl-stub";
import { Alert } from "../Alert";

describe("<Alert />", () => {
  const message = {
    error: true,
    content: "content.message.id",
    header: "header.message.id",
    text: "some text",
    icon: "warning"
  };

  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<Alert message={message} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("contains a formatted message with properties", () => {
    const wrapper = shallowWithIntl(<Alert message={message} />);
    expect(wrapper.find("Message")).toHaveLength(1);
    expect(wrapper.prop("content")).toEqual("content.message.id");
    expect(wrapper.prop("header")).toEqual("header.message.id");
  });
});
