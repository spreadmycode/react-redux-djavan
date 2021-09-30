import { compose, pure, withPropsOnChange, withHandlers } from 'recompose';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';

// actions
import { loadClients, loadSingleClient, deleteClientTrigger, editClientFormChange } from 'src/redux/clients/actions';
import { loadIssuers } from 'src/redux/issuers/actions';
import { loadUsers } from 'src/redux/users/actions';
import { loadIndustries } from 'src/redux/industries/actions';

// selectors
import { getIssuers } from 'src/redux/issuers/selectors';
import { getClients, getCurrentClient, getDepartmentClients } from 'src/redux/clients/selectors';
import { getUsers } from 'src/redux/users/selectors';
import { getIndustries } from 'src/redux/industries/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: ({ store: { dispatch }, params: { clientId } }) => Promise.all([
    dispatch(loadClients({
      filter: {
        // include clients which has no umbrella
        // exclude client with given id
        umbrella: { isnull: true },
        '-id': { eq: clientId },
      },
    })),
    dispatch(loadIssuers()),
    dispatch(loadUsers()),
    dispatch(loadSingleClient(clientId)),
    dispatch(loadIndustries()),
  ]),
}]);

const reduxConnect = connect(state => ({
  validationErrors: state.clients.validationErrors,
  parents: getClients(state),
  issuers: getIssuers(state),
  users: getUsers(state),
  industries: getIndustries(state),
  client: getCurrentClient(state),
  departmentClients: getDepartmentClients(state),
}), {
  onDelete: deleteClientTrigger,
  onFieldChange: editClientFormChange,
  onRedirect: push,
});

const propsEnhancer = withPropsOnChange(['client'], ({ client }) => {
  const breadcrumbs = [{
    label: 'Clients',
    url: '/clients',
  }];

  const { umbrella_obj } = client;

  if (umbrella_obj) {
    breadcrumbs.push({
      label: umbrella_obj.name,
      url: `/clients/${umbrella_obj.id}`,
    });
  }

  breadcrumbs.push({
    label: client.name,
  });

  return {
    breadcrumbs,
    initialValues: client,
  };
});

const reduxFormEnhancer = reduxForm({
  pure: true,
  enableReinitialize: true,
  form: 'editClientForm',
});

const handlersEnhancer = withHandlers({
  onDelete: ({ onDelete, client }) => () => onDelete(client.id),
  onFieldChange: ({ onFieldChange, client }) => () => onFieldChange(client.id),
});

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  propsEnhancer,
  reduxFormEnhancer,
  handlersEnhancer,
  pure,
);
