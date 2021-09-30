const prefix = 'services';

// UI actions
export const LIST_FILTERS_CHANGE = `${prefix}/LIST_FILTERS_CHANGE`;
export const NEW_SERVICE_FORM_CHANGE = `${prefix}/NEW_SERVICE_FORM_CHANGE`;
export const EDIT_SERVICE_FORM_CHANGE = `${prefix}/EDIT_SERVICE_FORM_CHANGE`;
export const DELETE_SERVICE_TRIGGER = `${prefix}/DELETE_SERVICE_TRIGGER`;

// API actions
export const LOAD_SERVICES = `${prefix}/LOAD_SERVICES`;
export const LOAD_SERVICES_SUCCESS = `${prefix}/LOAD_SERVICES_SUCCESS`;
export const LOAD_SERVICES_FAIL = `${prefix}/LOAD_SERVICES_FAIL`;

export const LOAD_SERVICE_CHOICES = `${prefix}/LOAD_SERVICE_CHOICES`;
export const LOAD_SERVICE_CHOICES_SUCCESS = `${prefix}/LOAD_SERVICE_CHOICES_SUCCESS`;
export const LOAD_SERVICE_CHOICES_FAIL = `${prefix}/LOAD_SERVICE_CHOICES_FAIL`;

export const LOAD_SINGLE_SERVICE = `${prefix}/LOAD_SINGLE_SERVICE`;
export const LOAD_SINGLE_SERVICE_SUCCESS = `${prefix}/LOAD_SINGLE_SERVICE_SUCCESS`;
export const LOAD_SINGLE_SERVICE_FAIL = `${prefix}/LOAD_SINGLE_SERVICE_FAIL`;

export const DELETE_SERVICE = `${prefix}/DELETE_SERVICE`;
export const DELETE_SERVICE_SUCCESS = `${prefix}/DELETE_SERVICE_SUCCESS`;
export const DELETE_SERVICE_FAIL = `${prefix}/DELETE_SERVICE_FAIL`;

export const EDIT_SERVICE = `${prefix}/EDIT_SERVICE`;
export const EDIT_SERVICE_SUCCESS = `${prefix}/EDIT_SERVICE_SUCCESS`;
export const EDIT_SERVICE_FAIL = `${prefix}/EDIT_SERVICE_FAIL`;

export const CREATE_SERVICE = `${prefix}/CREATE_SERVICE`;
export const CREATE_SERVICE_SUCCESS = `${prefix}/CREATE_SERVICE_SUCCESS`;
export const CREATE_SERVICE_FAIL = `${prefix}/CREATE_SERVICE_FAIL`;
