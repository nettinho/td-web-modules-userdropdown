import { getTree, getTrees, getLineageTree } from "..";

const data = {
  paths: [
    { uuid: 0, name: "P", contains: [1] },
    { uuid: 1, name: "AB", contains: [2, 6] },
    { uuid: 2, name: "A", contains: [3, 4, 5] },
    { uuid: 3, name: "a1", depends: [7] },
    { uuid: 4, name: "a2", depends: [11] },
    { uuid: 5, name: "a3", depends: [8] },
    { uuid: 6, name: "B", contains: [7, 8] },
    { uuid: 7, name: "b1", depends: [11] },
    { uuid: 8, name: "b2", depends: [13] },

    { uuid: 9, name: "CD", contains: [10, 12] },
    { uuid: 10, name: "C", contains: [11] },
    { uuid: 11, name: "c1" },
    { uuid: 12, name: "D", contains: [13] },
    { uuid: 13, name: "d1", depends: [14] },

    { uuid: 14, name: "e1" }
  ],
  uuids: ["3", "4", "5"]
};

describe("selectors: getTrees", () => {
  it("should have three trees", () => {
    const res = getTrees({ paths: data });
    expect(res).toHaveLength(3);
  });
});

describe("selectors: getTree", () => {
  it("should be a root node with three children", () => {
    const { uuid, children } = getTree({ paths: data });
    expect(uuid).toEqual("ROOT");
    expect(children).toHaveLength(3);
  });
});

describe("selectors: getLineageTree", () => {
  const item = getLineageTree({ paths: data });

  describe("root node", () => {
    it("should have 4 columns", () => {
      expect(item._cols).toEqual([0, 1, 2, 3]);
    });

    it("should have _height 4", () => {
      expect(item._height).toEqual(4);
    });

    it("should have width and height properties", () => {
      expect(item).toMatchObject({ height: 278, width: 1208 });
    });
  });
});
