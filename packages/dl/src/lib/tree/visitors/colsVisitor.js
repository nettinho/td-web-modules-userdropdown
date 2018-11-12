import _ from "lodash/fp";
import { onPost } from "zippa";
import { getChildren } from "../../node";

export const colsVisitor = onPost((item, _state) => {
  const children = getChildren(item);
  const _cols1 = _.flatMap("_cols")(_.filter(_.has("_cols"))(children));
  const _cols2 = _.some(_.has("_col"))(children)
    ? [_.max(_.map("_col")(_.filter(_.has("_col"))(children)))]
    : [];
  const _cols3 = _.has("_col")(item) ? [item._col] : [];
  const _cols = _.uniq(_.concat(_cols1, _.concat(_cols2, _cols3)));
  return _.isEmpty(_cols) ? item : { item: { ...item, _cols } };
});
