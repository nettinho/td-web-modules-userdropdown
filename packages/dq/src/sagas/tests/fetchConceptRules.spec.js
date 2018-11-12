import { testSaga } from "redux-saga-test-plan";
import {
  fetchConceptRulesRequestSaga,
  fetchConceptRulesSaga
} from "../fetchConceptRules";
import { fetchConceptRules } from "../../routines";

describe("sagas: fetchConceptRulesRequestSaga", () => {
  it("should invoke fetchConceptRulesSaga on trigger", () => {
    expect(() => {
      testSaga(fetchConceptRulesRequestSaga)
        .next()
        .takeLatestEffect(fetchConceptRules.TRIGGER, fetchConceptRulesSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchConceptRulesRequestSaga)
        .next()
        .takeLatestEffect("FOO", fetchConceptRulesRequestSaga);
    }).toThrow();
  });
});
