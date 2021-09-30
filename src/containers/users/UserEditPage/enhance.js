import { compose, pure, withPropsOnChange, withHandlers } from 'recompose';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

// actions
import { loadSingleUser, deleteUserTrigger, editUserFormChange } from 'src/redux/users/actions';
import { createAsset } from 'src/redux/assets/actions';
import { loadClients } from 'src/redux/clients/actions';

// selectors
import { getCurrentUser } from 'src/redux/users/selectors';
import { getClients } from 'src/redux/clients/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: ({ store: { dispatch }, params: { userId } }) => Promise.all([
    dispatch(loadSingleUser(userId)),
    dispatch(loadClients()),
  ]),
}]);

const reduxConnect = connect(state => ({
  clients: getClients(state),
  assetsData: state.assets.data,
  validationErrors: state.users.validationErrors,
  user: getCurrentUser(state),
}), {
  onDelete: deleteUserTrigger,
  onFieldChange: editUserFormChange,
  onUpload: createAsset,
});

const propsEnhancer = withPropsOnChange(['user'], ({ user }) => ({
  breadcrumbs: [{
    label: 'Users',
    url: '/users',
  }, {
    label: `${user.first_name} ${user.last_name}`,
  }],
  // initialValues used by reduxForm
  initialValues: user,
}));

const reduxFormEnhancer = reduxForm({
  pure: true,
  enableReinitialize: true,
  form: 'editUserForm',
});

const handlersEnhancer = withHandlers({
  onDelete: ({ onDelete, user }) => () => onDelete(user.id),
  onFieldChange: ({ onFieldChange, user }) => () => onFieldChange(user.id),
});

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  propsEnhancer,
  reduxFormEnhancer,
  handlersEnhancer,
  pure,
);
