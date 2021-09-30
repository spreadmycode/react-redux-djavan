import { compose, pure } from 'recompose';
import { reduxForm } from 'redux-form';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';

// actions
import {
  newDocumentTemplateFormChange,
  loadDocumentTemplateChoices,
} from 'src/redux/documentTemplates/actions';
import { loadIssuers } from 'src/redux/issuers/actions';

// selectors
import { getIssuers } from 'src/redux/issuers/selectors';


const reduxAsyncConnect = asyncConnect([{
  promise: ({ store: { dispatch } }) => Promise.all([
    dispatch(loadDocumentTemplateChoices()),
    dispatch(loadIssuers()),
  ]),
}]);

const reduxConnect = connect(state => ({
  choices: state.documentTemplates.choices,
  issuers: getIssuers(state),
  validationErrors: state.documentTemplates.validationErrors,
}), {
  onFieldChange: newDocumentTemplateFormChange,
});

const reduxFormEnhancer = reduxForm({
  pure: true,
  form: 'newDocumentTemplateForm',
  initialValues: {
    is_default: false,
  },
});

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  reduxFormEnhancer,
  pure,
);
