import { uploadConcepts } from "../routines";

const initialState = {
  loading: false,
  error: {}
};

export const uploadConceptsFile = (state = initialState, { type, payload }) => {
  switch (type) {
    case uploadConcepts.TRIGGER:
      return state;
    case uploadConcepts.REQUEST:
      return { ...state, loading: true };
    case uploadConcepts.SUCCESS:
      return state;
    case uploadConcepts.FAILURE:
      return { ...state, error: payload };
    case uploadConcepts.FULFILL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default uploadConceptsFile;
