import _ from "lodash/fp";
import {
  REQUEST_ELEMENTS_BY_LEVEL,
  REQUEST_ELEMENTS_BY_LEVEL_RECEIVED,
  REQUEST_ELEMENTS_BY_LEVEL_FAILED,
  LINEAGE_CLEAN_STATE
} from "../constants";

const initialStateForm = {
  listSelectElements: [],
  isLoading: false
};

const mapDataToListOfSelectItems = (
  state,
  targetUuid,
  currentLevel,
  { data }
) => {
  let listSelectElements = [...state.listSelectElements];
  let responseData = data;
  let uuidElement = targetUuid;
  let optionsList = responseData.map((option, i) =>
    instantiateOption(i, option)
  );
  optionsList = _.sortBy(caseInsensitiveLabel)(optionsList);
  // We create the first Select of the list (First Level)l
  // They will be groups
  if (listSelectElements.length == 0) {
    let initElement = instantiateElement(0, false, optionsList);
    listSelectElements.push(initElement);
  } else {
    // We should delete the existing elements from the current level + 1 given
    // that the count starts in 0
    currentLevel++;
    let listSize = listSelectElements.length;
    let firstIndexToRemove = currentLevel;
    let nElementsToRemove = listSize - firstIndexToRemove;
    if (firstIndexToRemove < listSize) {
      listSelectElements.splice(firstIndexToRemove, nElementsToRemove);
    }

    let bottomLevel = bottomLevelReached(responseData);

    let element = instantiateElement(currentLevel, bottomLevel, optionsList);
    listSelectElements.push(element);
    listSelectElements[currentLevel - 1].value = uuidElement;
  }

  return listSelectElements;
};

const caseInsensitiveLabel = ({ label }) => _.lowerCase(label);

const bottomLevelReached = data => {
  // If the labels are Resources the Select will be multiple = true
  const completedForm = data.find(d => d.labels[0] === "Resource")
    ? true
    : false;
  return completedForm;
};

const instantiateOption = (index, option) => {
  return {
    id: option.uuid,
    key: index,
    value: option.uuid,
    label: option.name,
    disabled: false
  };
};

const instantiateElement = (currentLevel, bottomLevel, optionsList) => {
  return {
    key: `SelectElement-${currentLevel}`,
    bottomLevel: bottomLevel,
    children: optionsList
  };
};

export const lineageForm = (
  state = initialStateForm,
  { type, uuidElement, currentLevel, data }
) => {
  switch (type) {
    case REQUEST_ELEMENTS_BY_LEVEL:
      return { ...state, isLoading: true };
    case REQUEST_ELEMENTS_BY_LEVEL_FAILED:
      return { ...state, isLoading: false };
    case REQUEST_ELEMENTS_BY_LEVEL_RECEIVED:
      return {
        ...state,
        isLoading: false,
        listSelectElements: mapDataToListOfSelectItems(
          state,
          uuidElement,
          currentLevel,
          data
        )
      };
    case LINEAGE_CLEAN_STATE:
      return { ...initialStateForm };
    default:
      return state;
  }
};
