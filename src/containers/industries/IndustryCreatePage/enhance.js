import { compose, pure } from 'recompose';
import { reduxForm } from 'redux-form';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';

// actions
import { newIndustryFormChange } from 'src/redux/industries/actions';

const reduxAsyncConnect = asyncConnect([{
  promise: () => Promise.resolve(),
}]);

const reduxConnect = connect(state => ({
  validationErrors: state.industries.validationErrors,
}), {
  onFieldChange: newIndustryFormChange,
});

const reduxFormEnhancer = reduxForm({
  pure: true,
  form: 'newIndustryForm',
  initialValues: {},
});

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  reduxFormEnhancer,
  pure,
);
