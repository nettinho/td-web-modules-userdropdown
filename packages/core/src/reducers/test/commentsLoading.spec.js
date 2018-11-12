import { commentsLoading } from "..";
import { createComment, fetchComments } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: commentsLoading", () => {
  it("should provide the initial state", () => {
    expect(commentsLoading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the fetchEvents.TRIGGER action", () => {
    expect(commentsLoading(false, { type: fetchComments.TRIGGER })).toBe(true);
  });

  it("should be true after receiving the createComment.TRIGGER action", () => {
    expect(commentsLoading(false, { type: createComment.TRIGGER })).toBe(true);
  });

  it("should be false after receiving the fetchEvents.FULFILL action", () => {
    expect(commentsLoading(true, { type: fetchComments.FULFILL })).toBe(false);
  });

  it("should be true after receiving the createComment.FULFILL action", () => {
    expect(commentsLoading(true, { type: createComment.FULFILL })).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(commentsLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});
