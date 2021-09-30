import * as c from './constants';

const endpoint = 'document-templates/';

// UI actions
export const listFiltersChange = () => ({
  type: c.LIST_FILTERS_CHANGE,
});

export const newDocumentTemplateFormChange = () => ({
  type: c.NEW_DOCUMENT_TEMPLATE_FORM_CHANGE,
});

export const editDocumentTemplateFormChange = id => ({
  type: c.EDIT_DOCUMENT_TEMPLATE_FORM_CHANGE,
  id,
});

export const deleteDocumentTemplateTrigger = id => ({
  type: c.DELETE_DOCUMENT_TEMPLATE_TRIGGER,
  id,
});

// API actions
export const loadDocumentTemplates = ({
  include = [],
  filter = {},
} = {}) => ({
  types: [
    c.LOAD_DOCUMENT_TEMPLATES,
    c.LOAD_DOCUMENT_TEMPLATES_SUCCESS,
    c.LOAD_DOCUMENT_TEMPLATES_FAIL,
  ],
  api: ({ get }) => get(endpoint, {
    params: {
      include,
      filter,
      per_page: 100,
    },
  }),
});

// load choices only once, they're hardcoded constants
export const loadDocumentTemplateChoices = () => (dispatch, getState) => {
  const { choices } = getState().documentTemplates;

  if (!choices) {
    return dispatch({
      types: [
        c.LOAD_DOCUMENT_TEMPLATE_CHOICES,
        c.LOAD_DOCUMENT_TEMPLATE_CHOICES_SUCCESS,
        c.LOAD_DOCUMENT_TEMPLATE_CHOICES_FAIL,
      ],
      api: ({ get }) => get(`${endpoint}choices/`),
    });
  }

  return undefined;
};

export const loadSingleDocumentTemplate = id => ({
  types: [
    c.LOAD_SINGLE_DOCUMENT_TEMPLATE,
    c.LOAD_SINGLE_DOCUMENT_TEMPLATE_SUCCESS,
    c.LOAD_SINGLE_DOCUMENT_TEMPLATE_FAIL,
  ],
  api: ({ get }) => get(endpoint + id),
});

export const createDocumentTemplate = data => ({
  types: [
    c.CREATE_DOCUMENT_TEMPLATE,
    c.CREATE_DOCUMENT_TEMPLATE_SUCCESS,
    c.CREATE_DOCUMENT_TEMPLATE_FAIL,
  ],
  api: ({ post }) => post(endpoint, { data }),
});

export const editDocumentTemplate = (id, data) => ({
  types: [
    c.EDIT_DOCUMENT_TEMPLATE,
    c.EDIT_DOCUMENT_TEMPLATE_SUCCESS,
    c.EDIT_DOCUMENT_TEMPLATE_FAIL,
  ],
  api: ({ patch }) => patch(endpoint + id, { data }),
});

export const deleteDocumentTemplate = id => ({
  types: [
    c.DELETE_DOCUMENT_TEMPLATE,
    c.DELETE_DOCUMENT_TEMPLATE_SUCCESS,
    c.DELETE_DOCUMENT_TEMPLATE_FAIL,
  ],
  api: ({ del }) => del(endpoint + id),
});
