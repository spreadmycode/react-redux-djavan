const prefix = 'users';

// UI actions
export const SUBMIT_LOGIN_FORM = `${prefix}/SUBMIT_LOGIN_FORM`;
export const LOGOUT = `${prefix}/LOGOUT`;
export const LIST_FILTERS_CHANGE = `${prefix}/LIST_FILTERS_CHANGE`;
export const PAGE_CHANGE = `${prefix}/PAGE_CHANGE`;
export const NEW_USER_FORM_CHANGE = `${prefix}/NEW_USER_FORM_CHANGE`;
export const EDIT_USER_FORM_CHANGE = `${prefix}/EDIT_USER_FORM_CHANGE`;
export const DELETE_USER_TRIGGER = `${prefix}/DELETE_USER_TRIGGER`;

// API actions
export const REFRESH_TOKEN = `${prefix}/REFRESH_TOKEN`;
export const REFRESH_TOKEN_SUCCESS = `${prefix}/REFRESH_TOKEN_SUCCESS`;
export const REFRESH_TOKEN_FAIL = `${prefix}/REFRESH_TOKEN_FAIL`;

export const LOGIN = `${prefix}/LOGIN`;
export const LOGIN_SUCCESS = `${prefix}/LOGIN_SUCCESS`;
export const LOGIN_FAIL = `${prefix}/LOGIN_FAIL`;

export const LOAD_USERS = `${prefix}/LOAD_USERS`;
export const LOAD_USERS_SUCCESS = `${prefix}/LOAD_USERS_SUCCESS`;
export const LOAD_USERS_FAIL = `${prefix}/LOAD_USERS_FAIL`;

export const LOAD_SINGLE_USER = `${prefix}/LOAD_SINGLE_USER`;
export const LOAD_SINGLE_USER_SUCCESS = `${prefix}/LOAD_SINGLE_USER_SUCCESS`;
export const LOAD_SINGLE_USER_FAIL = `${prefix}/LOAD_SINGLE_USER_FAIL`;

export const CREATE_USER = `${prefix}/CREATE_USER`;
export const CREATE_USER_SUCCESS = `${prefix}/CREATE_USER_SUCCESS`;
export const CREATE_USER_FAIL = `${prefix}/CREATE_USER_FAIL`;

export const DELETE_USER = `${prefix}/DELETE_CLIENT`;
export const DELETE_USER_SUCCESS = `${prefix}/DELETE_USER_SUCCESS`;
export const DELETE_USER_FAIL = `${prefix}/DELETE_USER_FAIL`;
