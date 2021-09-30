import * as c from './constants';

const endpoint = 'issuers/';

// UI actions
export const listFiltersChange = () => ({
  type: c.LIST_FILTERS_CHANGE,
});

export const newIssuerFormChange = () => ({
  type: c.NEW_ISSUER_FORM_CHANGE,
});

export const editIssuerFormChange = id => ({
  type: c.EDIT_ISSUER_FORM_CHANGE,
  id,
});

export const deleteIssuerTrigger = id => ({
  type: c.DELETE_ISSUER_TRIGGER,
  id,
});

// API actions
export const loadIssuers = ({
  include = [],
  filter = {},
} = {}) => ({
  types: [c.LOAD_ISSUERS, c.LOAD_ISSUERS_SUCCESS, c.LOAD_ISSUERS_FAIL],
  api: ({ get }) => get(endpoint, {
    params: {
      include,
      filter,
      per_page: 1000,
    },
  }),
});

export const loadSingleIssuer = id => ({
  types: [c.LOAD_SINGLE_ISSUER, c.LOAD_SINGLE_ISSUER_SUCCESS, c.LOAD_SINGLE_ISSUER_FAIL],
  api: ({ get }) => get(endpoint + id),
});

export const createIssuer = data => ({
  types: [c.CREATE_ISSUER, c.CREATE_ISSUER_SUCCESS, c.CREATE_ISSUER_FAIL],
  api: ({ post }) => post(endpoint, { data }),
});

export const editIssuer = (id, data) => ({
  types: [c.EDIT_ISSUER, c.EDIT_ISSUER_SUCCESS, c.EDIT_ISSUER_FAIL],
  api: ({ patch }) => patch(endpoint + id, { data }),
});

export const deleteIssuer = id => ({
  types: [c.DELETE_ISSUER, c.DELETE_ISSUER_SUCCESS, c.DELETE_ISSUER_FAIL],
  api: ({ del }) => del(endpoint + id),
});
