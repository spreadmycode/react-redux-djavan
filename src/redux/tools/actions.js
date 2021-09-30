import * as c from './constants';

const endpoint = 'tools/';

// UI actions
export const listFiltersChange = () => ({
  type: c.LIST_FILTERS_CHANGE,
});

export const newToolFormChange = () => ({
  type: c.NEW_TOOL_FORM_CHANGE,
});

export const editToolFormChange = id => ({
  type: c.EDIT_TOOL_FORM_CHANGE,
  id,
});

export const deleteToolTrigger = id => ({
  type: c.DELETE_TOOL_TRIGGER,
  id,
});

// API actions
export const loadTools = ({
  filter = {},
} = {}) => ({
  types: [c.LOAD_TOOLS, c.LOAD_TOOLS_SUCCESS, c.LOAD_TOOLS_FAIL],
  api: ({ get }) => get(endpoint, {
    params: {
      filter,
      include: ['services'],
      sort: ['default_sort_priority'],
    },
  }),
});

// load choices only once, they're hardcoded constants
export const loadToolChoices = () => (dispatch, getState) => {
  const { choices } = getState().tools;

  if (!choices) {
    return dispatch({
      types: [
        c.LOAD_TOOL_CHOICES,
        c.LOAD_TOOL_CHOICES_SUCCESS,
        c.LOAD_TOOL_CHOICES_FAIL,
      ],
      api: ({ get }) => get(`${endpoint}choices/`),
    });
  }

  return undefined;
};

export const loadSingleTool = id => ({
  types: [c.LOAD_SINGLE_TOOL, c.LOAD_SINGLE_TOOL_SUCCESS, c.LOAD_SINGLE_TOOL_FAIL],
  api: ({ get }) => get(endpoint + id, {
    params: {
      include: ['services'],
    },
  }),
});

export const createTool = data => ({
  types: [c.CREATE_TOOL, c.CREATE_TOOL_SUCCESS, c.CREATE_TOOL_FAIL],
  api: ({ post }) => post(endpoint, { data }),
});

export const editTool = (id, data) => ({
  types: [c.EDIT_TOOL, c.EDIT_TOOL_SUCCESS, c.EDIT_TOOL_FAIL],
  api: ({ patch }) => patch(endpoint + id, { data }),
});

export const deleteTool = id => ({
  types: [c.DELETE_TOOL, c.DELETE_TOOL_SUCCESS, c.DELETE_TOOL_FAIL],
  api: ({ del }) => del(endpoint + id),
});
