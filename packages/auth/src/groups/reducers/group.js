import _ from "lodash/fp";
import { clearGroup, fetchGroup, updateGroup, createGroup } from "../routines";

const initialState = {};

const pickFields = _.pick(["id", "name", "description"]);

const group = (state = initialState, { type, payload }) => {
  switch (type) {
    case clearGroup.TRIGGER:
      return initialState;
    case fetchGroup.TRIGGER:
      return initialState;
    case fetchGroup.SUCCESS:
      return pickFields(payload.data);
    case updateGroup.SUCCESS:
      return pickFields(payload.data);
    default:
      return state;
  }
};

const groupLoading = (state = false, { type }) => {
  switch (type) {
    case fetchGroup.TRIGGER:
      return true;
    case fetchGroup.FULFILL:
      return false;
    default:
      return state;
  }
};

const groupCreating = (state = false, { type }) => {
  switch (type) {
    case createGroup.TRIGGER:
      return true;
    case createGroup.FULFILL:
      return false;
    default:
      return state;
  }
};

const groupUpdating = (state = false, { type }) => {
  switch (type) {
    case updateGroup.TRIGGER:
      return true;
    case updateGroup.FULFILL:
      return false;
    default:
      return state;
  }
};

export { group, groupLoading, groupCreating, groupUpdating };
