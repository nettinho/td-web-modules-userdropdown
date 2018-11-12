import _ from "lodash/fp";
import { createSelector } from "reselect";

const getDomain = ({ domain }) => domain;
const getDomains = ({ domains }) => domains;
const getDomainsFilter = ({ domainsFilter }) => domainsFilter;

const isChildOf = ({ id }) => ({ parent_id }) => parent_id === id;
const isParentOf = ({ parent_id }) => ({ id }) => parent_id === id;

const hasNoParentIn = domains => domain => !_.some(isParentOf(domain))(domains);

/**
 * Creates a selector which returns the child domains of the currently selected domain.
 * If no domain is currently selected, it returns the domains for which no parent is found.
 */
const getChildOrRootDomains = createSelector(
  [getDomain, getDomains],
  (domain, domains) => {
    return _.isEmpty(domain)
      ? _.filter(hasNoParentIn(domains))(domains)
      : _.filter(isChildOf(domain))(domains);
  }
);

const findParentsIn = domains => child => _.filter(isParentOf(child))(domains);
const findChildrenIn = domains => parent =>
  _.filter(isChildOf(parent))(domains);

const findDescendents = parents => domains => {
  const children = _.flatMap(findChildrenIn(domains))(parents);
  return _.isEmpty(children)
    ? children
    : _.concat(children, findDescendents(children)(domains));
};

/**
 * A selector to compute the descendents of the currently selected domain.
 * If no domain is currently selected, all domains are returned.
 */
const getDescendents = createSelector(
  [getDomain, getDomains],
  (domain, domains) =>
    _.isEmpty(domain) ? domains : findDescendents([domain])(domains)
);

const toSearchable = _.flow(
  _.deburr,
  _.toLower,
  _.trim
);

const isValidFilter = filter => !_.isEmpty(toSearchable(filter));

const matchesFilter = filter =>
  _.flow(
    _.at(["name", "description"]),
    _.map(toSearchable),
    _.some(_.includes(toSearchable(filter)))
  );

/**
 * A selector to compute the domains whose name or description matches a search string.
 * If a domain is currently selected, the scope of the search will be limited to descendents
 * of the currently selected domain. The search is case-insensitive and accent-insensitive.
 */
const getFilteredDomains = createSelector(
  [getDescendents, getDomainsFilter],
  (descendents, domainsFilter) =>
    isValidFilter(domainsFilter)
      ? _.filter(matchesFilter(domainsFilter))(descendents)
      : []
);

const _getVisibleDomains = createSelector(
  [getDomainsFilter, getFilteredDomains, getChildOrRootDomains],
  (filter, filteredDomains, childOrRootDomains) =>
    _.isEmpty(filter) ? childOrRootDomains : filteredDomains
);

/**
 * A selector to compute the currently visible domains. If a filter is present, the selector
 * returns descendent domains matching the filter within the scope of the currently selected
 * domain (or within the scope of all domains if no domain is currently selected).
 * If no filter is present, the selector returns domains without parents.
 * Enriches domains with child count.
 */
const getVisibleDomains = createSelector(
  [_getVisibleDomains, getDomains],
  (visibleDomains, domains) =>
    visibleDomains
      .map(d => ({
        ...d,
        children: _.filter(isChildOf(d))(domains)
      }))
      .map(({ children, ...d }) => ({ childCount: children.length, ...d }))
);

/**
 * A selector to obtain unique domain types, sorted case-insensitively.
 */
const getDomainTypes = createSelector([getDomains], domains =>
  _.flow(
    _.map("type"),
    _.filter(_.isString),
    _.uniq,
    _.sortBy(_.toLower)
  )(domains)
);

const findAncestorsIn = domains => children => {
  const parents = _.flatMap(findParentsIn(domains))(children);
  return _.isEmpty(parents)
    ? parents
    : _.concat(findAncestorsIn(domains)(parents), parents);
};

/**
 * A selector to obtain the parents of the currently selected domain.
 */
const getAncestorDomains = createSelector(
  [getDomains, getDomain],
  (domains, domain) =>
    _.isEmpty(domain) ? [] : findAncestorsIn(domains)([domain])
);

export {
  getChildOrRootDomains,
  getDescendents,
  getFilteredDomains,
  getVisibleDomains,
  getDomainTypes,
  getAncestorDomains
};
