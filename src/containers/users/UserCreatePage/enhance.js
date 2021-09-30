import { compose, pure } from 'recompose';
import { reduxForm } from 'redux-form';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';

// actions
import { newUserFormChange } from 'src/redux/users/actions';
import { createAsset } from 'src/redux/assets/actions';
import { loadClients } from 'src/redux/clients/actions';

// selectors
import { getClients } from 'src/redux/clients/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(loadClients()),
}]);

const reduxConnect = connect(state => ({
  clients: getClients(state),
  assetsData: state.assets.data,
  validationErrors: state.users.validationErrors,
}), {
  onFieldChange: newUserFormChange,
  onUpload: createAsset,
});

const reduxFormEnhancer = reduxForm({
  pure: true,
  form: 'newUserForm',
  initialValues: {
    profile: {
      entity_type: 'rhino_profile',
    },
  },
});

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  reduxFormEnhancer,
  pure,
);
