import { createSelector } from 'reselect';

const getIssuersIds = state => state.issuers.ids;
const getCurrentIssuerId = state => state.issuers.id;
export const getIssuersData = state => state.issuers.data;

export const getIssuers = createSelector(
    [getIssuersIds, getIssuersData],
    (ids, data) => ids.map(id => data[id]),
);

export const getCurrentIssuer = createSelector(
  [getCurrentIssuerId, getIssuersData],
  (id, data) => data[id],
);
