import * as c from './constants';

const endpoint = 'adjustments/';

// UI actions
export const deleteAdjustmentTrigger = id => ({
  type: c.DELETE_ADJUSTMENT_TRIGGER,
  id,
});

export const editAdjustmentFieldChange = (id, data) => dispatch =>
  new Promise(resolve => dispatch({
    type: c.EDIT_ADJUSTMENT_FIELD_CHANGE,
    id,
    data,
    resolve,
  }));

// API actions
export const loadAdjustments = ({
  include = [],
  filter = {},
} = {}) => ({
  types: [c.LOAD_ADJUSTMENTS, c.LOAD_ADJUSTMENTS_SUCCESS, c.LOAD_ADJUSTMENTS_FAIL],
  api: ({ get }) => get(endpoint, {
    params: {
      include,
      filter,
      per_page: 1000,
    },
  }),
});

export const createAdjustment = data => ({
  types: [c.CREATE_ADJUSTMENT, c.CREATE_ADJUSTMENT_SUCCESS, c.CREATE_ADJUSTMENT_FAIL],
  api: ({ post }) => post(endpoint, {
    data: {
      ...data,
      commit: true,
    },
  }),
});

export const editAdjustment = (id, data) => ({
  types: [c.EDIT_ADJUSTMENT, c.EDIT_ADJUSTMENT_SUCCESS, c.EDIT_ADJUSTMENT_FAIL],
  api: ({ patch }) => patch(endpoint + id, { data }),
  id,
});

export const deleteAdjustment = id => ({
  types: [c.DELETE_ADJUSTMENT, c.DELETE_ADJUSTMENT_SUCCESS, c.DELETE_ADJUSTMENT_FAIL],
  api: ({ del }) => del(endpoint + id),
  id,
});
