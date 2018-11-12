import { createRoutine } from "redux-saga-routines";

export const fetchDomains = createRoutine("FETCH_DOMAINS");
export const optionsDomains = createRoutine("OPTIONS_DOMAINS");
export const clearDomains = createRoutine("CLEAR_DOMAINS");
export const filterDomains = createRoutine("FILTER_DOMAINS");
export const clearFilterDomains = createRoutine("CLEAR_FILTER_DOMAINS");

export const fetchDomainMembers = createRoutine("FETCH_DOMAIN_MEMBERS");
export const addDomainMember = createRoutine("ADD_DOMAIN_MEMBER");
export const deleteDomainMember = createRoutine("DELETE_DOMAIN_MEMBER");

export const fetchDomain = createRoutine("FETCH_DOMAIN");
export const createDomain = createRoutine("CREATE_DOMAIN");
export const updateDomain = createRoutine("UPDATE_DOMAIN");
export const deleteDomain = createRoutine("DELETE_DOMAIN");
export const clearDomain = createRoutine("CLEAR_DOMAIN");
