import _ from "lodash/fp";
import { List, Map } from "immutable";
import { onPost, onPre } from "zippa";
import { margin, padding } from "./styles";

export const leafWidth = 200;
export const leafHeight = 22;
const leafPadHeight = 12;

const tableTitleHeight = 24;
const groupTitleHeight = 24;
const fieldHeight = 20;
const ySpacing = 24;

const isField = _.propEq("type", "lineage-field");
const isTable = _.propEq("type", "lineage-table");
const isFile = _.overSome([
  _.propEq("type", "File"),
  _.propEq("subtype", "FileHost")
]);
const isLeaf = _.propEq("_height", 0);
const isLevel1 = _.propEq("_height", 1);

const isLeafWidth = _.overSome([isLeaf, isField, isTable, isFile]);

const getTableHeight = ({ children }) =>
  tableTitleHeight + fieldHeight * _.size(children);

const getLevel1Height = ({ children }) =>
  groupTitleHeight + 8 + _.size(children) * (leafHeight + leafPadHeight);

const getGroupHeight = ({ children }) => {
  const heightsByColumn = _.map(({ _cols, height }) =>
    _.map(col => [col, height + ySpacing])(_cols)
  )(children);
  const heightMaps = _.map(Map)(heightsByColumn);
  const heightMap = heightMaps.reduce((m1, m2) =>
    m1.mergeWith((v1, v2) => v1 + v2, m2)
  );
  // console.log(external_id, heightMap.toJS(), heightMap.max());
  return groupTitleHeight + heightMap.max();
};

const getHeight = _.cond([
  [isField, _.constant(fieldHeight)],
  [isTable, getTableHeight],
  [isFile, getTableHeight],
  [isLeaf, _.constant(leafHeight)],
  [isLevel1, getLevel1Height],
  [_.stubTrue, getGroupHeight]
]);

const sum = (a, b) => a + b;

const getChildSpacing = children =>
  children.size <= 1
    ? 0
    : children
        .butLast()
        .zip(children.rest())
        .map(([c1, c2]) => _.max([margin(c1).right, margin(c2).left]))
        .reduce(sum);

const multiColumnWidth = item => {
  const { children } = item;
  const childrenByCols = List(children)
    .groupBy(x => _.head(_.get("_cols")(x)))
    .toMap()
    .map(x => x.maxBy(_.get("width")))
    .valueSeq();
  const childWidth = childrenByCols.map(_.get("width")).reduce(sum);
  const leftSpacing = padding(item).left;
  const rightSpacing = padding(item).right;
  const childSpacing = getChildSpacing(childrenByCols);
  // console.log(childSpacing, leftSpacing, rightSpacing, childWidth);
  return childSpacing + leftSpacing + rightSpacing + childWidth;
};

const singleColumnWidth = item => {
  const { children } = item;
  const childWidths = _.map(_.propOr(0, "width"))(children);
  return _.max(childWidths) + padding(item).left + padding(item).right;
};

const isSingleColumn = x => _.size(_.get("_cols")(x)) <= 1;

export const getWidth = _.cond([
  [isLeafWidth, _.constant(leafWidth)],
  [_.propEq("_height", 1), singleColumnWidth],
  [isSingleColumn, singleColumnWidth],
  [_.stubTrue, multiColumnWidth]
]);

export const sortByColVisitor = onPost((item, _state) => {
  const { children } = item;

  // sort children by leftmost column
  return children
    ? { item: { ...item, children: _.sortBy(c => _.min(c._cols))(children) } }
    : null;
});

export const svgVisitor = onPost((item, _state) => {
  const width = getWidth(item);
  const height = getHeight(item);

  const i = Object.assign({}, item, { width, height });

  return { item: i };
});
