import * as c from './constants';

const endpoint = 'service-instances/';

// UI actions
export const deleteServiceInstanceTrigger = (id, shouldRedirect) => ({
  type: c.DELETE_SERVICE_INSTANCE_TRIGGER,
  id,
  shouldRedirect,
});

export const editServiceInstanceFieldChange = (id, path) => ({
  type: c.EDIT_SERVICE_INSTANCE_FIELD_CHANGE,
  id,
  path,
});

// API actions
export const loadServiceInstances = ({
  include = [],
  filter = {},
} = {}) => ({
  types: [
    c.LOAD_SERVICE_INSTANCES,
    c.LOAD_SERVICE_INSTANCES_SUCCESS,
    c.LOAD_SERVICE_INSTANCES_FAIL,
  ],
  api: ({ get }) => get(endpoint, {
    params: {
      include,
      filter,
      per_page: 1000,
    },
  }),
});

// load choices only once, they're hardcoded constants
export const loadDocumentTemplateChoices = () => (dispatch, getState) => {
  const { choices } = getState().documentTemplates;

  if (!choices) {
    return dispatch({
      types: [
        c.LOAD_SERVICE_INSTANCE_CHOICES,
        c.LOAD_SERVICE_INSTANCE_CHOICES_SUCCESS,
        c.LOAD_SERVICE_INSTANCE_CHOICES_FAIL,
      ],
      api: ({ get }) => get(`${endpoint}choices/`),
    });
  }

  return undefined;
};

export const loadSingleServiceInstance = id => ({
  types: [
    c.LOAD_SINGLE_SERVICE_INSTANCE,
    c.LOAD_SINGLE_SERVICE_INSTANCE_SUCCESS,
    c.LOAD_SINGLE_SERVICE_INSTANCE_FAIL,
  ],
  api: ({ get }) => get(endpoint + id, {
    params: {
      include: [
        'service_group.service_order',
        'service_group.primary_service_order',
        'adjustments',
      ],
    },
  }),
});

export const createServiceInstance = data => ({
  types: [
    c.CREATE_SERVICE_INSTANCE,
    c.CREATE_SERVICE_INSTANCE_SUCCESS,
    c.CREATE_SERVICE_INSTANCE_FAIL,
  ],
  api: ({ post }) => post(endpoint, {
    data: {
      ...data,
      commit: true,
    },
  }),
});

export const editServiceInstance = (id, data) => ({
  types: [
    c.EDIT_SERVICE_INSTANCE,
    c.EDIT_SERVICE_INSTANCE_SUCCESS,
    c.EDIT_SERVICE_INSTANCE_FAIL,
  ],
  api: ({ patch }) => patch(endpoint + id, { data }),
  id,
});

export const deleteServiceInstance = (id, shouldRedirect) => ({
  types: [
    c.DELETE_SERVICE_INSTANCE,
    c.DELETE_SERVICE_INSTANCE_SUCCESS,
    c.DELETE_SERVICE_INSTANCE_FAIL,
  ],
  api: ({ del }) => del(endpoint + id),
  id,
  shouldRedirect,
});
