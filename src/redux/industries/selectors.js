import { createSelector } from 'reselect';

const getIndustriesIds = state => state.industries.ids;
const getCurrentIndustryId = state => state.industries.id;
export const getIndustriesData = state => state.industries.data;

export const getIndustries = createSelector(
    [getIndustriesIds, getIndustriesData],
    (ids, data) => ids.map(id => data[id]),
);

export const getCurrentIndustry = createSelector(
  [getCurrentIndustryId, getIndustriesData],
  (id, data) => data[id],
);
