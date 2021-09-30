const prefix = 'clients';

// UI actions
export const NEW_CLIENT_FORM_CHANGE = `${prefix}/NEW_CLIENT_FORM_CHANGE`;
export const EDIT_CLIENT_FORM_CHANGE = `${prefix}/EDIT_CLIENT_FORM_CHANGE`;
export const DELETE_CLIENT_TRIGGER = `${prefix}/DELETE_CLIENT_TRIGGER`;
export const LIST_FILTERS_CHANGE = `${prefix}/LIST_FILTERS_CHANGE`;
export const PAGE_CHANGE = `${prefix}/PAGE_CHANGE`;

// API actions
export const LOAD_CLIENTS = `${prefix}/LOAD_CLIENTS`;
export const LOAD_CLIENTS_SUCCESS = `${prefix}/LOAD_CLIENTS_SUCCESS`;
export const LOAD_CLIENTS_FAIL = `${prefix}/LOAD_CLIENTS_FAIL`;

export const LOAD_SINGLE_CLIENT = `${prefix}/LOAD_SINGLE_CLIENT`;
export const LOAD_SINGLE_CLIENT_SUCCESS = `${prefix}/LOAD_SINGLE_CLIENT_SUCCESS`;
export const LOAD_SINGLE_CLIENT_FAIL = `${prefix}/LOAD_SINGLE_CLIENT_FAIL`;

export const CREATE_CLIENT = `${prefix}/CREATE_CLIENT`;
export const CREATE_CLIENT_SUCCESS = `${prefix}/CREATE_CLIENT_SUCCESS`;
export const CREATE_CLIENT_FAIL = `${prefix}/CREATE_CLIENT_FAIL`;

export const DELETE_CLIENT = `${prefix}/DELETE_CLIENT`;
export const DELETE_CLIENT_SUCCESS = `${prefix}/DELETE_CLIENT_SUCCESS`;
export const DELETE_CLIENT_FAIL = `${prefix}/DELETE_CLIENT_FAIL`;

export const EDIT_CLIENT = `${prefix}/EDIT_CLIENT`;
export const EDIT_CLIENT_SUCCESS = `${prefix}/EDIT_CLIENT_SUCCESS`;
export const EDIT_CLIENT_FAIL = `${prefix}/EDIT_CLIENT_FAIL`;
