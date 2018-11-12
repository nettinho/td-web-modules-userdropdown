import { fetchDatalakes } from "../routines";

const datalakesLoading = (state = false, { type }) => {
  switch (type) {
    case fetchDatalakes.TRIGGER:
      return true;
    case fetchDatalakes.REQUEST:
      return true;
    case fetchDatalakes.FULFILL:
      return false;
    default:
      return state;
  }
};

export { datalakesLoading };
