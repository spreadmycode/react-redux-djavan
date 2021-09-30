import { number, string, shape, arrayOf, any, node, bool, func, object } from 'prop-types';

// this module exports the most widely used custom prop types

// common types

export const breadcrumbsType = arrayOf(shape({
  label: node.isRequired,
  url: string,
}));

export const selectOptionsType = arrayOf(shape({
  label: node,
  value: any.isRequired,
}));

export const reduxFormInputType = shape({
  checked: bool,
  name: string.isRequired,
  onBlur: func.isRequired,
  onChange: func.isRequired,
  onDragStart: func.isRequired,
  onDrop: func.isRequired,
  onFocus: func.isRequired,
  value: any,
});

export const reduxFormMetaType = shape({
  active: bool.isRequired,
  asyncValidating: bool.isRequired,
  autofilled: bool.isRequired,
  dirty: bool.isRequired,
  dispatch: func.isRequired,
  error: string,
  form: string.isRequired,
  invalid: bool.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  submitFailed: bool.isRequired,
  touched: bool.isRequired,
  valid: bool.isRequired,
  visited: bool.isRequired,
  warning: string,
});

// entity types

export const clientType = shape({
  id: number.isRequired,
  name: string.isRequired,
});

export const issuerType = shape({
  id: number.isRequired,
  name: string.isRequired,
  is_default: bool.isRequired,
});

export const userType = shape({
  id: number.isRequired,
  first_name: string.isRequired,
  last_name: string.isRequired,
});

export const serviceType = shape({
  id: number.isRequired,
  name: string.isRequired,
});

export const toolType = shape({
  id: number.isRequired,
  name: string.isRequired,
  html_body: string.isRequired,
});

export const documentTemplateType = shape({
  id: number.isRequired,
  is_default: bool.isRequired,
  html_body: string.isRequired,
});

export const industryType = shape({
  id: number.isRequired,
  name: string.isRequired,
  html_body: string.isRequired,
});

export const focalProfileType = shape({
  id: number.isRequired,
  title: string.isRequired,
  created: string.isRequired,
  is_default: bool.isRequired,
  phone: string,
  last_modified: string.isRequired,
});

export const serviceOrderType = shape({
  status: string.isRequired,
  csv_enabled: bool.isRequired,
  custom_title: string,
  days_to_complete: number.isRequired,
  id: number.isRequired,
  signed_date: string,
  strategic_considerations: string,
  version: number.isRequired,
  assessment_count: number.isRequired,
  hours_per_day: number.isRequired,
  start_date: string,
  travel_enabled: bool.isRequired,
  end_date: string,
  scope_intro: string,
  number_of_employees: number.isRequired,
  payment: string.isRequired,
  composite_id: string.isRequired,
  version_date: string.isRequired,
  created: string.isRequired,
  notes: string.isRequired,
  sign_by_date: string.isRequired,
  total_due: number.isRequired,
  remediation_text: string,
  rules_of_engagement: string,
});

export const serviceInstanceType = shape({
  feature_image: null,
  display_remediation_text: string,
  custom_sort_priority: number.isRequired,
  display_engagement_type: string,
  unit_price: number.isRequired,
  service_group_id: number.isRequired,
  display_name: string,
  id: number.isRequired,
  description: string,
  information_provided: string,
  end_date: string,
  display_html_body: string,
  display_engagement_type_description: string,
  display_description: string.isRequired,
  name: string,
  display_remediation_ordered: bool.isRequired,
  scope_summary: string.isRequired,
  remediation_text: string,
  engagement_type_description: string,
  engagement_type: string,
  scope_text: arrayOf(string.isRequired),
  start_date: string,
  number_of_hours: number.isRequired,
  html_body: string.isRequired,
});

export const assetType = shape({
  id: number.isRequired,
  interaction_log: arrayOf(object).isRequired,
  uuid: string.isRequired,
  created: string.isRequired,
  file_name: string.isRequired,
  file_extension: string.isRequired,
  entity_type: string.isRequired,
  checksum: string.isRequired,
  download: string.isRequired,
  mime_type: 'image/jpeg',
  size: number.isRequired,
});
