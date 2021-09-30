import { compose, pure } from 'recompose';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

// actions
import {
  newServiceOrderFormChange,
  loadServiceOrderChoices,
} from 'src/redux/serviceOrders/actions';
import { loadClients } from 'src/redux/clients/actions';
import { loadUsers } from 'src/redux/users/actions';
import { loadIndustries } from 'src/redux/industries/actions';

// selectors
import { getClients } from 'src/redux/clients/selectors';
import { getUsers } from 'src/redux/users/selectors';
import { getIndustries } from 'src/redux/industries/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: ({
    store: { dispatch },
  }) => Promise.all([
    dispatch(loadServiceOrderChoices()),
    dispatch(loadClients()),
    dispatch(loadUsers()),
    dispatch(loadIndustries()),
  ]),
}]);

const reduxConnect = connect(state => ({
  validationErrors: state.serviceOrders.validationErrors,
  choices: state.serviceOrders.choices,
  clients: getClients(state),
  users: getUsers(state),
  industries: getIndustries(state),
  usersData: state.users.data,
  initialValues: {
    industries: [],
    team: [],
    revisions: [],
    custom_title: null,
    strategic_considerations: '',
    scope_intro: '',
    remediation_text: '',
    scope_exclusion: '',
    rules_of_engagement: '',
  },
}), {
  onFieldChange: newServiceOrderFormChange,
});

const reduxFormEnhancer = reduxForm({
  pure: true,
  enableReinitialize: true,
  form: 'newServiceOrderForm',
});

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  reduxFormEnhancer,
  pure,
);
