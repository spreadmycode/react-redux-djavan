import { compose, pure, withPropsOnChange, withHandlers } from 'recompose';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

// actions
import {
  loadSingleDocumentTemplate,
  deleteDocumentTemplateTrigger,
  editDocumentTemplateFormChange,
  loadDocumentTemplateChoices,
} from 'src/redux/documentTemplates/actions';

import { loadIssuers } from 'src/redux/issuers/actions';

// selectors
import { getCurrentDocumentTemplate } from 'src/redux/documentTemplates/selectors';
import { getIssuers } from 'src/redux/issuers/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: ({ store: { dispatch }, params: { templateId } }) => Promise.all([
    dispatch(loadDocumentTemplateChoices()),
    dispatch(loadSingleDocumentTemplate(templateId)),
    dispatch(loadIssuers()),
  ]),
}]);

const reduxConnect = connect(state => ({
  validationErrors: state.documentTemplates.validationErrors,
  choices: state.documentTemplates.choices,
  issuers: getIssuers(state),
  documentTemplate: getCurrentDocumentTemplate(state),
}), {
  onDelete: deleteDocumentTemplateTrigger,
  onFieldChange: editDocumentTemplateFormChange,
});

const propsEnhancer = withPropsOnChange(['documentTemplate'], ({ documentTemplate }) => ({
  breadcrumbs: [{
    label: 'DocumentTemplates',
    url: '/documentTemplates',
  }, {
    label: documentTemplate.id,
  }],
  // initialValues used by reduxForm
  initialValues: documentTemplate,
}));

const reduxFormEnhancer = reduxForm({
  pure: true,
  enableReinitialize: true,
  form: 'editDocumentTemplateForm',
});

const handlersEnhancer = withHandlers({
  onDelete: ({ onDelete, documentTemplate }) => () => onDelete(documentTemplate.id),
  onFieldChange: ({ onFieldChange, documentTemplate }) => () => onFieldChange(documentTemplate.id),
});

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  propsEnhancer,
  reduxFormEnhancer,
  handlersEnhancer,
  pure,
);
