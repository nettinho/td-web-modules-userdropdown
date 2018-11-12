import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { compose } from "redux";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import svgPanZoom from "svg-pan-zoom";
import { Loader } from "semantic-ui-react";
import { getLineageTree, getLineageLinks } from "../selectors";
import LineageDefs from "./LineageDefs";
import Link from "./Link";

const Etl = ({ name, children, x, y, width, height }) => {
  return (
    <g>
      <g className="group">
        <rect x={x} y={y} width={width} height={height} rx="4" ry="4" />
        <text x={x + 8} y={y + 16} className="h2">
          {name}
        </text>
        {children &&
          children.map((c, i) => (
            <g key={i} className="etl">
              <rect x={c.x} y={c.y} width={c.width} height="22" rx="4" ry="4" />
              <g transform="translate(0, 16)">
                <text x={c.x + c.width / 2} y={c.y}>
                  {c.name}
                </text>
              </g>
            </g>
          ))}
      </g>
    </g>
  );
};

const Table = ({ name, children, x, y, width, height }) => {
  return (
    <g className="table">
      <rect x={x} y={y} width={width} height={height} />
      <rect x={x} y={y} width={width} height="22" className="name" />
      <rect x={x} y={y + 22} width={width} height={height - 22} />
      <g>
        <g transform="translate(4, 16)">
          <text x={x} y={y} className="h3">
            {name}
          </text>
          {children &&
            children.map((c, i) => (
              <text key={i} x={c.x} y={c.y}>
                {c.name}
              </text>
            ))}
        </g>
      </g>
    </g>
  );
};

const Group = props => {
  const { name, children, _height, type, subtype, width, height, x, y } = props;
  if (type === "lineage-table" || type === "File" || subtype === "FileHost") {
    return <Table {...props} />;
  } else if (_height === 1) {
    return <Etl {...props} />;
  } else {
    return (
      <g className="group">
        <rect x={x} y={y} rx="4" ry="4" width={width} height={height} />
        <text x={x + 8} y={y + 16} className="h1">
          {name}
        </text>
        {children &&
          _height > 1 &&
          children.map((item, i) => <Group key={i} {...item} />)}
      </g>
    );
  }
};

class LineageTree extends React.Component {
  constructor(props) {
    super(props);
    this.svg = React.createRef();
  }

  componentDidMount() {
    const {
      tree: { item },
      pathsLoading
    } = this.props;
    if (!pathsLoading && item && item._height) {
      svgPanZoom(this.svg.current);
    }
  }

  componentDidUpdate() {
    const { pathsLoading } = this.props;
    if (!pathsLoading) {
      svgPanZoom(this.svg.current);
    }
  }

  render() {
    const { tree, links, pathsLoading } = this.props;
    const { type_analysis } = queryString.parse(location.search);
    return (
      <React.Fragment>
        <h1>
          <FormattedMessage id={`visualization.title.${type_analysis}`} />
        </h1>
        {pathsLoading && <Loader active size="massive" />}
        {!pathsLoading &&
          tree &&
          tree._height && (
            <svg width="1600" height="800" ref={this.svg}>
              <LineageDefs />
              <g className="svg-pan-zoom_viewport dl">
                {tree.children.map((child, i) => <Group key={i} {...child} />)}
                {links && links.map((path, i) => <Link key={i} path={path} />)}
              </g>
            </svg>
          )}
      </React.Fragment>
    );
  }
}

LineageTree.propTypes = {
  tree: PropTypes.object,
  location: PropTypes.object,
  pathsLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  tree: getLineageTree(state),
  links: getLineageLinks(state),
  pathsLoading: state.pathsLoading
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(LineageTree);
