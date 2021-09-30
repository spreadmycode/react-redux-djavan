import * as c from './constants';

const endpoint = 'service-groups/';

// UI actions
export const deleteServiceGroupTrigger = id => ({
  type: c.DELETE_SERVICE_GROUP_TRIGGER,
  id,
});

export const editServiceGroupFieldChange = (id, path) => ({
  type: c.EDIT_SERVICE_GROUP_FIELD_CHANGE,
  id,
  path,
});

// API actions
export const loadServiceGroups = ({
  include = [],
  filter = {},
} = {}) => ({
  types: [c.LOAD_SERVICE_GROUPS, c.LOAD_SERVICE_GROUPS_SUCCESS, c.LOAD_SERVICE_GROUPS_FAIL],
  api: ({ get }) => get(endpoint, {
    params: {
      include,
      filter,
      per_page: 1000,
    },
  }),
});

// load choices only once, they're hardcoded constants
export const loadServiceGroupChoices = () => (dispatch, getState) => {
  const { choices } = getState().serviceGroups;

  if (!choices) {
    return dispatch({
      types: [
        c.LOAD_SERVICE_GROUP_CHOICES,
        c.LOAD_SERVICE_GROUP_CHOICES_SUCCESS,
        c.LOAD_SERVICE_GROUP_CHOICES_FAIL,
      ],
      api: ({ get }) => get(`${endpoint}choices/`),
    });
  }

  return undefined;
};

export const loadSingleServiceGroup = id => ({
  types: [
    c.LOAD_SINGLE_SERVICE_GROUP,
    c.LOAD_SINGLE_SERVICE_GROUP_SUCCESS,
    c.LOAD_SINGLE_SERVICE_GROUP_FAIL,
  ],
  api: ({ get }) => get(endpoint + id, {
    params: {
      include: [
        'service_instances',
        'adjustments',
        'service_order',
        'primary_service_order',
      ],
    },
  }),
});

export const createServiceGroup = data => ({
  types: [c.CREATE_SERVICE_GROUP, c.CREATE_SERVICE_GROUP_SUCCESS, c.CREATE_SERVICE_GROUP_FAIL],
  api: ({ post }) => post(endpoint, {
    data: {
      ...data,
      commit: true,
    },
  }),
});

export const editServiceGroup = (id, data) => ({
  types: [c.EDIT_SERVICE_GROUP, c.EDIT_SERVICE_GROUP_SUCCESS, c.EDIT_SERVICE_GROUP_FAIL],
  api: ({ patch }) => patch(endpoint + id, { data }),
  id,
});

export const deleteServiceGroup = id => ({
  types: [c.DELETE_SERVICE_GROUP, c.DELETE_SERVICE_GROUP_SUCCESS, c.DELETE_SERVICE_GROUP_FAIL],
  api: ({ del }) => del(endpoint + id),
  id,
});
