import { createSelector } from 'reselect';

import { getFocalProfilesData } from 'src/redux/focalProfiles/selectors';
import { getRhinoProfilesData } from 'src/redux/rhinoProfiles/selectors';

const getUsersIds = state => state.users.ids;
const getCurrentUserId = state => state.users.id;
const getMeId = state => state.users.me;
const getUsersData = state => state.users.data;

export const getUsers = createSelector(
    [getUsersIds, getUsersData, getFocalProfilesData, getRhinoProfilesData],
    (ids, data, focalProfilesData, rhinoProfilesData) => ids.map(id => ({
      ...data[id],
      focal_profile: data[id].focal_profile ? focalProfilesData[data[id].focal_profile] : {},
      rhino_profile: data[id].rhino_profile ? rhinoProfilesData[data[id].rhino_profile] : {},
    })),
);

export const getSessionUser = createSelector(
    [getMeId, getUsersData],
    (me, data) => data[me],
);

export const getCurrentUser = createSelector(
  [getCurrentUserId, getUsersData],
  (id, data) => data[id],
);
