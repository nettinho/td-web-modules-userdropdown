import { fetchEvents } from "../routines";

const eventsLoading = (state = false, { type }) => {
  switch (type) {
    case fetchEvents.TRIGGER:
      return true;
    case fetchEvents.FULFILL:
      return false;
    default:
      return state;
  }
};

export { eventsLoading };
