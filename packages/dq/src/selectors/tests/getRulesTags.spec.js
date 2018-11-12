import { getRulesTags } from "..";

describe("selectors: getRulesTags", () => {
  const r1 = { id: "1", tag: { tags: [{ name: "Tag1" }, { name: "Tag2" }] } };
  const r2 = { id: "2", tag: { tags: [{ name: "Tag1" }, { name: "Tag3" }] } };
  const r3 = { id: "3", tag: { tags: [{ name: "Tag4" }, { name: "Tag5" }] } };
  const rules = [r1, r2, r3];

  it("should return all the tags from the rules", () => {
    const ruleTags = getRulesTags({ rules });
    expect(ruleTags.length).toBe(5);
    expect(ruleTags).toEqual(["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"]);
  });
});
