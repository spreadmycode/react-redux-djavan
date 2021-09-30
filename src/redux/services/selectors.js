import { createSelector } from 'reselect';

const getServicesData = state => state.services.data;
const getServicesIds = state => state.services.ids;
const getCurrentServiceId = state => state.services.id;

export const getServices = createSelector(
  [getServicesIds, getServicesData],
  (ids, data) => ids.map(id => data[id]),
);

export const getService = createSelector(
  [getCurrentServiceId, getServicesData],
  (id, data) => data[id],
);
