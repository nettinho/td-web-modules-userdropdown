import { paths, pathsLoading } from "..";
import { fetchPaths } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: pathsLoading", () => {
  it("should provide the initial state", () => {
    expect(pathsLoading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the TRIGGER action", () => {
    expect(pathsLoading(false, { type: fetchPaths.TRIGGER })).toBe(true);
  });

  it("should be false after receiving the FULFILL action", () => {
    expect(pathsLoading(true, { type: fetchPaths.FULFILL })).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(pathsLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});

describe("reducers: paths", () => {
  const initialState = {};

  it("should provide the initial state", () => {
    expect(paths(undefined, {})).toEqual(initialState);
  });

  it("should handle the SUCCESS action", () => {
    const somePaths = [{ id: 1, name: "Path 1" }, { id: 2, name: "Path 2" }];
    const data = { paths: somePaths, uuids: [1, 2] };

    expect(
      paths(fooState, {
        type: fetchPaths.SUCCESS,
        payload: { data }
      })
    ).toMatchObject(data);
  });

  it("should ignore unknown actions", () => {
    expect(paths(fooState, { type: "FOO" })).toBe(fooState);
  });
});
