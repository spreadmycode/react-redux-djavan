import { compose, pure } from 'recompose';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { reduxForm } from 'redux-form';

// actions
import { newServiceFormChange, loadServiceChoices } from 'src/redux/services/actions';
import { createAsset } from 'src/redux/assets/actions';

// selectors
import { getAssetsData } from 'src/redux/assets/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(loadServiceChoices()),
}]);

const reduxConnect = connect(state => ({
  choices: state.services.choices,
  assetsData: getAssetsData(state),
  validationErrors: state.services.validationErrors,
}), {
  onFieldChange: newServiceFormChange,
  onUploadAsset: createAsset,
});

const reduxFormEnhancer = reduxForm({
  pure: true,
  form: 'newServiceForm',
  initialValues: {
    default_sort_priority: 0,
  },
});

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  reduxFormEnhancer,
  pure,
);
