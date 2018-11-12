import { createRoutine } from "redux-saga-routines";

export const clearConcept = createRoutine("CLEAR_CONCEPT");
export const clearConceptArchive = createRoutine("CLEAR_CONCEPT_ARCHIVE");
export const clearConceptFilters = createRoutine("CLEAR_CONCEPT_FILTERS");
export const clearConceptLinkFields = createRoutine(
  "CLEAR_CONCEPT_LINK_FIELDS"
);
export const clearConceptLinks = createRoutine("CLEAR_CONCEPT_LINKS");
export const clearConceptLinkStructures = createRoutine(
  "CLEAR_CONCEPT_LINK_STRUCTURES"
);
export const clearConceptQueryFilters = createRoutine(
  "CLEAR_CONCEPT_QUERY_FILTERS"
);
export const clearConcepts = createRoutine("CLEAR_CONCEPTS");
export const clearDomainConcepts = createRoutine("CLEAR_DOMAIN_CONCEPTS");
export const conceptAction = createRoutine("CONCEPT_ACTION");
export const deleteConceptLink = createRoutine("DELETE_CONCEPT_LINK");
export const downloadConcepts = createRoutine("DOWNLOAD_CONCEPTS");
export const uploadConcepts = createRoutine("UPLOAD_CONCEPTS");
export const fetchConcept = createRoutine("FETCH_CONCEPT");
export const fetchConceptArchive = createRoutine("FETCH_CONCEPT_ARCHIVE");
export const fetchConceptFilters = createRoutine("FETCH_CONCEPT_FILTERS");
export const fetchConceptLinkFields = createRoutine(
  "FETCH_CONCEPT_LINK_FIELDS"
);
export const fetchConceptLinks = createRoutine("FETCH_CONCEPT_LINKS");
export const fetchConceptLinkStructures = createRoutine(
  "FETCH_CONCEPT_LINK_STRUCTURES"
);
export const fetchConcepts = createRoutine("FETCH_CONCEPTS");
export const fetchDomainConcepts = createRoutine("FETCH_DOMAIN_CONCEPTS");
export const linkConcept = createRoutine("LINK_CONCEPT");
export const selectConceptPage = createRoutine("SELECT_CONCEPT_PAGE");
export const updateConceptPath = createRoutine("UPDATE_CONCEPT_PATH");

export const addConceptSelectedFilter = createRoutine(
  "ADD_CONCEPT_SELECTED_FILTER"
);
export const removeConceptSelectedFilter = createRoutine(
  "REMOVE_CONCEPT_SELECTED_FILTER"
);

export const openConceptFilter = createRoutine("OPEN_CONCEPT_FILTER");
export const closeConceptFilter = createRoutine("OPEN_CONCEPT_FILTER");
