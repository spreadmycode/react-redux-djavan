import { compose, pure } from 'recompose';
import { reduxForm } from 'redux-form';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';

// actions
import { newIssuerFormChange } from 'src/redux/issuers/actions';

const reduxAsyncConnect = asyncConnect([{
  promise: () => Promise.resolve(),
}]);

const reduxConnect = connect(state => ({
  validationErrors: state.issuers.validationErrors,
}), {
  onFieldChange: newIssuerFormChange,
});

const reduxFormEnhancer = reduxForm({
  pure: true,
  form: 'newIssuerForm',
  initialValues: {},
});

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  reduxFormEnhancer,
  pure,
);
