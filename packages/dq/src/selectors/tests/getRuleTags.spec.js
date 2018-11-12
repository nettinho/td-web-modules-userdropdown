import { getRuleTags } from "..";

describe("selectors: getRulesTags", () => {
  const rule = { id: "1", tag: { tags: [{ name: "Tag1" }, { name: "Tag2" }] } };

  it("should return all the tags from the specified rule", () => {
    const ruleTags = getRuleTags({ rule });
    expect(ruleTags.length).toBe(2);
    expect(ruleTags).toEqual(["Tag1", "Tag2"]);
  });
});
