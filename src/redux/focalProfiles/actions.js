import * as c from './constants';

const endpoint = 'focal-profiles/';

// API actions
export const loadFocalProfiles = ({
  filter = {},
} = {}) => ({
  types: [c.LOAD_FOCAL_PROFILES, c.LOAD_FOCAL_PROFILES_SUCCESS, c.LOAD_FOCAL_PROFILES_FAIL],
  api: ({ get }) => get(endpoint, {
    params: {
      filter,
      per_page: 1000,
    },
  }),
});
