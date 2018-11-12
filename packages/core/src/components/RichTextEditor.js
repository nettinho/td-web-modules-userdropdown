import _ from "lodash/fp";
import { Editor, getEventTransfer } from "slate-react";
import { Value } from "slate";

import React from "react";
import isUrl from "is-url";
import { isKeyHotkey } from "is-hotkey";
import { Menu, Icon } from "semantic-ui-react";

const DEFAULT_NODE = "paragraph";

const isBoldHotkey = isKeyHotkey("mod+b");
const isItalicHotkey = isKeyHotkey("mod+i");
const isUnderlinedHotkey = isKeyHotkey("mod+u");
//const isCodeHotkey = isKeyHotkey("mod+`");

function wrapLink(change, href) {
  change.wrapInline({
    type: "link",
    data: { href }
  });

  change.moveToEnd();
}

function unwrapLink(change) {
  change.unwrapInline("link");
}

export class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    const { value } = this.props;
    let json;
    if (_.isEmpty(value)) {
      json = {
        document: {
          nodes: [
            {
              object: "block",
              type: "paragraph",
              nodes: []
            }
          ]
        }
      };
    } else {
      json = value;
    }
    this.state = { value: Value.fromJSON(json) };
  }

  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type == type);
  };

  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type == type);
  };

  renderLabel() {
    const { label, required } = this.props;
    if (!label) return null;
    const classname = required ? "required field" : "field";
    return (
      <div className={classname}>
        <label>{label}</label>
      </div>
    );
  }

  renderEditor() {
    return (
      <div>
        {this.renderLabel()}
        <div
          style={{
            border: "1px solid rgba(34, 36, 38, 0.15)",
            borderRadius: "0.28571429rem"
          }}
        >
          <Menu>
            {this.renderMarkButton("bold", "bold")}
            {this.renderMarkButton("italic", "italic")}
            {this.renderMarkButton("underlined", "underline")}
            {/* {this.renderMarkButton('code', 'file code')} */}
            {this.renderBlockButton("heading-one", "header")}
            {this.renderBlockButton("heading-two", "h")}
            {/* {this.renderBlockButton('block-quote', 'quote right')} */}
            {this.renderBlockButton("numbered-list", "list ol")}
            {this.renderBlockButton("bulleted-list", "list ul")}
            {this.renderLinkButton("link", "linkify")}
          </Menu>
          <div style={{ padding: "10px" }}>
            <Editor
              spellCheck
              autoFocus
              value={this.state.value}
              onChange={this.onChange}
              onPaste={this.onPaste}
              onKeyDown={this.onKeyDown}
              renderNode={this.renderNode}
              renderMark={this.renderMark}
            />
          </div>
        </div>
      </div>
    );
  }

  renderReadOnly() {
    return (
      <div>
        <Editor
          readOnly
          value={this.state.value}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
        />
      </div>
    );
  }

  render() {
    const { readOnly } = this.props;
    if (readOnly) {
      return this.renderReadOnly();
    } else {
      return this.renderEditor();
    }
  }

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);

    return (
      <Menu.Item
        icon
        disabled={!isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        <Icon name={icon} />
      </Menu.Item>
    );
  };

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);
    if (["numbered-list", "bulleted-list"].includes(type)) {
      const { value } = this.state;
      let parent;
      const blocks = value.blocks;
      if (blocks.size != 0) {
        parent = value.document.getParent(blocks.first().key);
      }
      isActive = this.hasBlock("list-item") && parent && parent.type === type;
    }

    return (
      <Menu.Item
        icon
        disabled={!isActive}
        onMouseDown={event => this.onClickBlock(event, type)}
      >
        <Icon name={icon} />
      </Menu.Item>
    );
  };

  renderLinkButton = (type, icon) => {
    const isActive = this.hasLinks();

    return (
      <Menu.Item
        icon
        disabled={!isActive}
        onMouseDown={event => this.onClickLink(event, type)}
      >
        <Icon name={icon} />
      </Menu.Item>
    );
  };

  renderNode = props => {
    const { attributes, children, node } = props;

    switch (node.type) {
      // case 'block-quote':
      //   return <blockquote {...attributes}>{children}</blockquote>
      case "bulleted-list":
        return <ul {...attributes}>{children}</ul>;
      case "heading-one":
        return (
          <h1 style={{ "font-size": "18px" }} {...attributes}>
            {children}
          </h1>
        );
      case "heading-two":
        return (
          <h2 style={{ "font-size": "15px" }} {...attributes}>
            {children}
          </h2>
        );
      case "list-item":
        return <li {...attributes}>{children}</li>;
      case "numbered-list":
        return <ol {...attributes}> {children}</ol>;
      case "link":
        const { data } = node;
        const href = data.get("href");
        return (
          <a
            {...attributes}
            href={href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {children}
          </a>
        );
    }
  };

  renderMark = props => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>;
      // case 'code':
      //   return <code {...attributes}>{children}</code>
      case "italic":
        return <em {...attributes}>{children}</em>;
      case "underlined":
        return <u {...attributes}>{children}</u>;
    }
  };

  onChange = ({ value }) => {
    this.setState({ value });
    const { onChange } = this.props;
    if (onChange) {
      const { text } = value.document;
      const json = text ? value.toJSON() : {};
      onChange({ value: json });
    }
  };

  onKeyDown = (event, change) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = "bold";
    } else if (isItalicHotkey(event)) {
      mark = "italic";
    } else if (isUnderlinedHotkey(event)) {
      mark = "underlined";
      // } else if (isCodeHotkey(event)) {
      //   mark = 'code'
    } else {
      return;
    }

    event.preventDefault();
    change.toggleMark(mark);
    return true;
  };

  onClickMark = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change().toggleMark(type);
    this.onChange(change);
  };

  onClickBlock = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change();
    const { document } = value;

    if (type != "bulleted-list" && type != "numbered-list") {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock("list-item");

      if (isList) {
        change
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else {
        change.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      const isList = this.hasBlock("list-item");
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type == type);
      });

      if (isList && isType) {
        change
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else if (isList) {
        change
          .unwrapBlock(
            type == "bulleted-list" ? "numbered-list" : "bulleted-list"
          )
          .wrapBlock(type);
      } else {
        change.setBlocks("list-item").wrapBlock(type);
      }
    }

    this.onChange(change);
  };

  hasLinks = () => {
    const { value } = this.state;
    return value.inlines.some(inline => inline.type == "link");
  };

  onPaste = (event, change) => {
    if (change.value.selection.isCollapsed) return;

    const transfer = getEventTransfer(event);
    const { type, text } = transfer;
    if (type != "text" && type != "html") return;
    if (!isUrl(text)) return;

    if (this.hasLinks()) {
      change.call(unwrapLink);
    }

    change.call(wrapLink, text);
    return true;
  };

  onClickLink = event => {
    event.preventDefault();
    const { value } = this.state;
    const hasLinks = this.hasLinks();
    const change = value.change();

    if (hasLinks) {
      change.call(unwrapLink);
    } else if (value.selection.isExpanded) {
      const href = window.prompt("Introduzca la URL del Link:");
      change.call(wrapLink, href);
    } else {
      const href = window.prompt("Introduzca la URL del Link:");
      const text = window.prompt("Introduzca el Texto del Link:");
      change
        .insertText(text)
        .moveFocusForward(0 - text.length)
        .call(wrapLink, href);
    }

    this.onChange(change);
  };
}

export default RichTextEditor;
