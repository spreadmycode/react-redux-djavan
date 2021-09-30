const prefix = 'issuers';

// UI actions
export const LIST_FILTERS_CHANGE = `${prefix}/LIST_FILTERS_CHANGE`;
export const NEW_ISSUER_FORM_CHANGE = `${prefix}/NEW_ISSUER_FORM_CHANGE`;
export const EDIT_ISSUER_FORM_CHANGE = `${prefix}/EDIT_ISSUER_FORM_CHANGE`;
export const DELETE_ISSUER_TRIGGER = `${prefix}/DELETE_ISSUER_TRIGGER`;

// API actions
export const LOAD_ISSUERS = `${prefix}/LOAD_ISSUERS`;
export const LOAD_ISSUERS_SUCCESS = `${prefix}/LOAD_ISSUERS_SUCCESS`;
export const LOAD_ISSUERS_FAIL = `${prefix}/LOAD_ISSUERS_FAIL`;

export const LOAD_SINGLE_ISSUER = `${prefix}/LOAD_SINGLE_ISSUER`;
export const LOAD_SINGLE_ISSUER_SUCCESS = `${prefix}/LOAD_SINGLE_ISSUER_SUCCESS`;
export const LOAD_SINGLE_ISSUER_FAIL = `${prefix}/LOAD_SINGLE_ISSUER_FAIL`;

export const EDIT_ISSUER = `${prefix}/EDIT_ISSUER`;
export const EDIT_ISSUER_SUCCESS = `${prefix}/EDIT_ISSUER_SUCCESS`;
export const EDIT_ISSUER_FAIL = `${prefix}/EDIT_ISSUER_FAIL`;

export const CREATE_ISSUER = `${prefix}/CREATE_ISSUER`;
export const CREATE_ISSUER_SUCCESS = `${prefix}/CREATE_ISSUER_SUCCESS`;
export const CREATE_ISSUER_FAIL = `${prefix}/CREATE_ISSUER_FAIL`;

export const DELETE_ISSUER = `${prefix}/DELETE_ISSUER`;
export const DELETE_ISSUER_SUCCESS = `${prefix}/DELETE_ISSUER_SUCCESS`;
export const DELETE_ISSUER_FAIL = `${prefix}/DELETE_ISSUER_FAIL`;
