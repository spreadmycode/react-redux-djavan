import * as c from './constants';

const endpoint = 'users/';

// UI actions
export const loginSubmit = () => ({
  type: c.SUBMIT_LOGIN_FORM,
});

export const logout = () => ({
  type: c.LOGOUT,
});

export const listFiltersChange = () => ({
  type: c.LIST_FILTERS_CHANGE,
});

export const pageChange = page => ({
  type: c.PAGE_CHANGE,
  page,
});

export const newUserFormChange = () => ({
  type: c.NEW_USER_FORM_CHANGE,
});

export const editUserFormChange = id => ({
  type: c.EDIT_USER_FORM_CHANGE,
  id,
});

export const deleteUserTrigger = id => ({
  type: c.DELETE_USER_TRIGGER,
  id,
});

// API actions

export const refreshToken = token => ({
  types: [c.REFRESH_TOKEN, c.REFRESH_TOKEN_SUCCESS, c.REFRESH_TOKEN_FAIL],
  api: ({ post }) => post('token/refresh/', {
    data: { token },
    useToken: false,
  }),
});

export const login = data => ({
  types: [c.LOGIN, c.LOGIN_SUCCESS, c.LOGIN_FAIL],
  api: ({ post }) => post('token/', {
    data,
    useToken: false,
  }),
});

export const loadUsers = ({
  filter = {},
  per_page = 1000,
  sort = ['id'],
  page = 1,
  include = [],
} = {}) => ({
  types: [c.LOAD_USERS, c.LOAD_USERS_SUCCESS, c.LOAD_USERS_FAIL],
  api: ({ get }) => get(endpoint, {
    params: {
      filter,
      sort,
      per_page,
      page,
      include,
    },
  }),
});

export const loadSingleUser = id => ({
  types: [c.LOAD_SINGLE_USER, c.LOAD_SINGLE_USER_SUCCESS, c.LOAD_SINGLE_USER_FAIL],
  api: ({ get }) => get(endpoint + id, {
    params: {
      include: [],
    },
  }),
});

export const createUser = data => ({
  types: [c.CREATE_USER, c.CREATE_USER_SUCCESS, c.CREATE_USER_FAIL],
  api: ({ post }) => post(endpoint, { data }),
});

export const deleteUser = id => ({
  types: [c.DELETE_USER, c.DELETE_USER_SUCCESS, c.DELETE_USER_FAIL],
  api: ({ del }) => del(endpoint + id),
});
