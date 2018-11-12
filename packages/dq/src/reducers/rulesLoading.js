import { fetchRules } from "../routines";

const rulesLoading = (state = false, { type }) => {
  switch (type) {
    case fetchRules.TRIGGER:
      return true;
    case fetchRules.FULFILL:
      return false;
    default:
      return state;
  }
};

export { rulesLoading };
