import * as c from './constants';

const endpoint = 'industries/';

// UI actions
export const listFiltersChange = () => ({
  type: c.LIST_FILTERS_CHANGE,
});

export const newIndustryFormChange = () => ({
  type: c.NEW_INDUSTRY_FORM_CHANGE,
});

export const editIndustryFormChange = id => ({
  type: c.EDIT_INDUSTRY_FORM_CHANGE,
  id,
});

export const deleteIndustryTrigger = id => ({
  type: c.DELETE_INDUSTRY_TRIGGER,
  id,
});

// API actions
export const loadIndustries = ({
  include = [],
  filter = {},
} = {}) => ({
  types: [c.LOAD_INDUSTRIES, c.LOAD_INDUSTRIES_SUCCESS, c.LOAD_INDUSTRIES_FAIL],
  api: ({ get }) => get(endpoint, {
    params: {
      include,
      filter,
      per_page: 1000,
    },
  }),
});

export const loadSingleIndustry = id => ({
  types: [c.LOAD_SINGLE_INDUSTRY, c.LOAD_SINGLE_INDUSTRY_SUCCESS, c.LOAD_SINGLE_INDUSTRY_FAIL],
  api: ({ get }) => get(endpoint + id),
});

export const createIndustry = data => ({
  types: [c.CREATE_INDUSTRY, c.CREATE_INDUSTRY_SUCCESS, c.CREATE_INDUSTRY_FAIL],
  api: ({ post }) => post(endpoint, { data }),
});

export const editIndustry = (id, data) => ({
  types: [c.EDIT_INDUSTRY, c.EDIT_INDUSTRY_SUCCESS, c.EDIT_INDUSTRY_FAIL],
  api: ({ patch }) => patch(endpoint + id, { data }),
});

export const deleteIndustry = id => ({
  types: [c.DELETE_INDUSTRY, c.DELETE_INDUSTRY_SUCCESS, c.DELETE_INDUSTRY_FAIL],
  api: ({ del }) => del(endpoint + id),
});
