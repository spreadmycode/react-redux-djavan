import { compose, pure, withPropsOnChange, withHandlers } from 'recompose';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

// actions
import { loadSingleIssuer, deleteIssuerTrigger, editIssuerFormChange } from 'src/redux/issuers/actions';

// selectors
import { getCurrentIssuer } from 'src/redux/issuers/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: ({ store: { dispatch }, params: { issuerId } }) => dispatch(loadSingleIssuer(issuerId)),
}]);

const reduxConnect = connect(state => ({
  validationErrors: state.issuers.validationErrors,
  issuer: getCurrentIssuer(state),
}), {
  onDelete: deleteIssuerTrigger,
  onFieldChange: editIssuerFormChange,
});

const propsEnhancer = withPropsOnChange(['issuer'], ({ issuer }) => ({
  breadcrumbs: [{
    label: 'Issuers',
    url: '/issuers',
  }, {
    label: issuer.name,
  }],
  // initialValues used by reduxForm
  initialValues: issuer,
}));

const reduxFormEnhancer = reduxForm({
  pure: true,
  enableReinitialize: true,
  form: 'editIssuerForm',
});

const handlersEnhancer = withHandlers({
  onDelete: ({ onDelete, issuer }) => () => onDelete(issuer.id),
  onFieldChange: ({ onFieldChange, issuer }) => () => onFieldChange(issuer.id),
});

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  propsEnhancer,
  reduxFormEnhancer,
  handlersEnhancer,
  pure,
);
