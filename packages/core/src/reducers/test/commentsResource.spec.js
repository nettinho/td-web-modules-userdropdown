import { commentsResource } from "..";
import { clearComments, fetchComments } from "../../routines";

const fooState = { foo: "bar" };
const data = { resource_id: 12, resource_type: "business_concept" };

describe("reducers: commentsLoading", () => {
  it("should provide the initial state", () => {
    expect(commentsResource(undefined, {})).toMatchObject({});
  });

  it("should be true after receiving the fetchComments.REQUEST action", () => {
    expect(
      commentsResource(fooState, { type: fetchComments.REQUEST, payload: data })
    ).toMatchObject(data);
  });

  it("should be false after receiving the clearComments.TRIGGER action", () => {
    expect(
      commentsResource(fooState, { type: clearComments.TRIGGER })
    ).toMatchObject({});
  });
});
