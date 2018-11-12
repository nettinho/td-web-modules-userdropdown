const API_BUSINESS_CONCEPT_VERSION = "/api/business_concept_versions/:id";
const API_BUSINESS_CONCEPT_VERSIONS_CSV = "/api/business_concept_versions/csv";
const API_BUSINESS_CONCEPT_VERSIONS_SEARCH =
  "/api/business_concept_versions/search";
const API_CONCEPT_ARCHIVE = "/api/business_concept_versions/:id/versions";
const API_CONCEPT_FILTERS = "/api/business_concept_filters";
const API_CONCEPT_LINK = "/api/:resource_type/:resource_id/links/:id";
const API_CONCEPT_LINK_FIELDS =
  "/api/business_concept_versions/:concept_id/data_structures/:structure_id/data_fields";
const API_CONCEPT_LINK_STRUCTURES =
  "/api/business_concept_versions/:id/data_structures";
const API_CONCEPT_LINKS = "/api/:resource_type/:resource_id/links";

export {
  API_BUSINESS_CONCEPT_VERSION,
  API_BUSINESS_CONCEPT_VERSIONS_CSV,
  API_BUSINESS_CONCEPT_VERSIONS_SEARCH,
  API_CONCEPT_ARCHIVE,
  API_CONCEPT_FILTERS,
  API_CONCEPT_LINK_FIELDS,
  API_CONCEPT_LINK_STRUCTURES,
  API_CONCEPT_LINK,
  API_CONCEPT_LINKS
};
