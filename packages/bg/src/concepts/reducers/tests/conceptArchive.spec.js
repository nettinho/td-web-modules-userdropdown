import { conceptArchive } from "..";
import { fetchConceptArchive } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: conceptArchive", () => {
  const initialState = [];

  it("should provide the initial state", () => {
    expect(conceptArchive(undefined, {})).toEqual(initialState);
  });

  it("should handle the fetchConceptArchive.REQUEST action", () => {
    expect(
      conceptArchive(fooState, { type: fetchConceptArchive.REQUEST })
    ).toEqual(initialState);
  });

  it("should handle the fetchConceptArchive.SUCCESS action", () => {
    const data = [
      {
        id: 123,
        status: "status",
        last_change_at: "2018-06-27T07:32:53.154377Z",
        last_change_by: "maixu",
        version: 1
      }
    ];
    expect(
      conceptArchive(fooState, {
        type: fetchConceptArchive.SUCCESS,
        payload: { data }
      })
    ).toEqual(data);
  });

  it("should ignore unknown actions", () => {
    expect(conceptArchive(fooState, { type: "FOO" })).toBe(fooState);
  });
});
