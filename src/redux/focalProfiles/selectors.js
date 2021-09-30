import { createSelector } from 'reselect';

const getFocalProfilesIds = state => state.focalProfiles.ids;
export const getFocalProfilesData = state => state.focalProfiles.data;

export const getFocalProfiles = createSelector(
    [getFocalProfilesIds, getFocalProfilesData],
    (ids, data) => ids.map(id => data[id]),
);
