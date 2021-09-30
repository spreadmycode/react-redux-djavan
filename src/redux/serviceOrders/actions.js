import * as c from './constants';

const endpoint = 'service-orders/';

// UI actions
export const listFiltersChange = () => ({
  type: c.LIST_FILTERS_CHANGE,
});

export const pageChange = page => ({
  type: c.PAGE_CHANGE,
  page,
});

export const newServiceOrderFormChange = () => ({
  type: c.NEW_SERVICE_ORDER_FORM_CHANGE,
});

export const editServiceOrderFormChange = id => ({
  type: c.EDIT_SERVICE_ORDER_FORM_CHANGE,
  id,
});

export const deleteServiceOrderTrigger = id => ({
  type: c.DELETE_SERVICE_ORDER_TRIGGER,
  id,
});

// API actions
export const loadServiceOrders = ({
  page = 1,
  per_page = 10,
  sort = undefined,
  include = [],
  filter = {},
} = {}) => ({
  types: [
    c.LOAD_SERVICE_ORDERS,
    c.LOAD_SERVICE_ORDERS_SUCCESS,
    c.LOAD_SERVICE_ORDERS_FAIL,
  ],
  api: ({ get }) => get(endpoint, {
    params: {
      page,
      per_page,
      sort,
      include,
      filter,
    },
  }),
});

// load choices only once, they're hardcoded constants
export const loadServiceOrderChoices = () => (dispatch, getState) => {
  const { choices } = getState().serviceOrders;

  if (!choices) {
    return dispatch({
      types: [
        c.LOAD_SERVICE_ORDER_CHOICES,
        c.LOAD_SERVICE_ORDER_CHOICES_SUCCESS,
        c.LOAD_SERVICE_ORDER_CHOICES_FAIL,
      ],
      api: ({ get }) => get(`${endpoint}choices/`),
    });
  }

  return undefined;
};

export const loadSingleServiceOrder = id => ({
  types: [
    c.LOAD_SINGLE_SERVICE_ORDER,
    c.LOAD_SINGLE_SERVICE_ORDER_SUCCESS,
    c.LOAD_SINGLE_SERVICE_ORDER_FAIL,
  ],
  api: ({ get }) => get(endpoint + id, {
    params: {
      include: [
        'client',
        'service_groups.service_instances',
        'primary_service_group.service_instances',
        'service_groups.adjustments',
        'primary_service_group.adjustments',
      ],
    },
  }),
});

export const createServiceOrder = data => ({
  types: [c.CREATE_SERVICE_ORDER, c.CREATE_SERVICE_ORDER_SUCCESS, c.CREATE_SERVICE_ORDER_FAIL],
  api: ({ post }) => post(endpoint, { data }),
});

export const editServiceOrder = (id, data) => ({
  types: [c.EDIT_SERVICE_ORDER, c.EDIT_SERVICE_ORDER_SUCCESS, c.EDIT_SERVICE_ORDER_FAIL],
  api: ({ patch }) => patch(endpoint + id, { data }),
});

export const deleteServiceOrder = id => ({
  types: [c.DELETE_SERVICE_ORDER, c.DELETE_SERVICE_ORDER_SUCCESS, c.DELETE_SERVICE_ORDER_FAIL],
  api: ({ del }) => del(endpoint + id),
});
