import _ from "lodash/fp";
import { onPost } from "zippa";
import { getId } from "../../node";

export const columnVisitor = colMap =>
  onPost((item, _state) => {
    const itemId = getId(item);
    const _col = colMap.get(itemId);
    return _.isUndefined(_col) ? null : { item: { ...item, _col } };
  });
