import { compose, pure } from 'recompose';
import { reduxForm } from 'redux-form';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';

// actions
import { newToolFormChange, loadToolChoices } from 'src/redux/tools/actions';
import { loadServices } from 'src/redux/services/actions';

// selectors
import { getServices } from 'src/redux/services/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: ({ store: { dispatch } }) => Promise.all([
    dispatch(loadToolChoices()),
    dispatch(loadServices()),
  ]),
}]);

const reduxConnect = connect(state => ({
  services: getServices(state),
  choices: state.tools.choices,
  validationErrors: state.tools.validationErrors,
}), {
  onFieldChange: newToolFormChange,
});

const reduxFormEnhancer = reduxForm({
  pure: true,
  form: 'newToolForm',
  initialValues: {
    associated_findings: [],
    services: [],
    default_sort_priority: 0,
  },
});

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  reduxFormEnhancer,
  pure,
);
