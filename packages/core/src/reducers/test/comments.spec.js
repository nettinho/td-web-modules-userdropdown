import { comments } from "..";
import { clearComments, createComment, fetchComments } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: comments", () => {
  const initialState = [];

  it("should provide the initial state", () => {
    expect(comments(undefined, {})).toEqual(initialState);
  });

  it("should handle the TRIGGER action", () => {
    expect(
      comments(fooState, { type: fetchComments.TRIGGER, payload: {} })
    ).toEqual(initialState);
  });

  it("should handle the SUCCESS action", () => {
    const someComments = [
      { content: "My first comment", resource_id: 2 },
      { content: "My second comment", resource_id: 2 }
    ];

    const data = someComments;

    expect(
      comments(fooState, { type: fetchComments.SUCCESS, payload: { data } })
    ).toMatchObject(someComments);
  });

  it("should handle the createComment.SUCCESS action", () => {
    const someComments = [
      { content: "My first comment", resource_id: 2 },
      { content: "My second comment", resource_id: 2 }
    ];
    const newComment = { content: "My third comment", resource_id: 2 };
    const data = newComment;
    const resultState = [newComment, ...someComments];
    expect(
      comments(someComments, { type: createComment.SUCCESS, payload: { data } })
    ).toMatchObject(resultState);
  });

  it("should handle the CLEAR events", () => {
    const someComments = [
      { content: "My first comment", resource_id: 2 },
      { content: "My second comment", resource_id: 2 }
    ];

    expect(
      comments(someComments, { type: clearComments.TRIGGER })
    ).toMatchObject([]);
  });

  it("should ignore unknown actions", () => {
    expect(comments(fooState, { type: "FOO" })).toBe(fooState);
  });
});
