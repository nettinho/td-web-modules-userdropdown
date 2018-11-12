import { getWidth, leafWidth } from "../svgVisitor";

describe("library: svgVisitor", () => {
  describe("getWidth", () => {
    it("should be constant for leaves", () => {
      const item = { _height: 0 };
      expect(getWidth(item)).toBe(leafWidth);
    });

    it("should be constant for lineage-table", () => {
      const item = { type: "lineage-table" };
      expect(getWidth(item)).toBe(leafWidth);
    });
  });
});
