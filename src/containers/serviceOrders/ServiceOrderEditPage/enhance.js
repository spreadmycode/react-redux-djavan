import { compose, pure, withPropsOnChange, withHandlers } from 'recompose';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

// actions
import {
  loadSingleServiceOrder,
  deleteServiceOrderTrigger,
  editServiceOrderFormChange,
  loadServiceOrderChoices,
} from 'src/redux/serviceOrders/actions';
import { loadClients } from 'src/redux/clients/actions';
import { loadUsers } from 'src/redux/users/actions';
import { loadIndustries } from 'src/redux/industries/actions';
import { loadFocalProfiles } from 'src/redux/focalProfiles/actions';
import { loadServices } from 'src/redux/services/actions';
import {
  editServiceGroupFieldChange,
  createServiceGroup,
  deleteServiceGroupTrigger,
  loadServiceGroupChoices,
} from 'src/redux/serviceGroups/actions';
import {
  editServiceInstanceFieldChange,
  createServiceInstance,
  deleteServiceInstanceTrigger,
} from 'src/redux/serviceInstances/actions';
import {
  editAdjustmentFieldChange,
  createAdjustment,
  deleteAdjustmentTrigger,
} from 'src/redux/adjustments/actions';

// selectors
import { getCurrentServiceOrder, getSummaryOfCosts } from 'src/redux/serviceOrders/selectors';
import { getClients } from 'src/redux/clients/selectors';
import { getUsers } from 'src/redux/users/selectors';
import { getIndustries } from 'src/redux/industries/selectors';
import { getFocalProfiles } from 'src/redux/focalProfiles/selectors';
import { getServices } from 'src/redux/services/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: async ({
    store: { dispatch },
    params: { serviceOrderId },
  }) => {
    try {
      const [serviceOrderSuccessAction] = await Promise.all([
        dispatch(loadSingleServiceOrder(serviceOrderId)),
        dispatch(loadServiceOrderChoices()),
        dispatch(loadServiceGroupChoices()),
        dispatch(loadClients({
          filter: {
            'service_orders.id': { eq: serviceOrderId },
          },
        })),
        dispatch(loadUsers()),
        dispatch(loadIndustries()),
        dispatch(loadServices()),
      ]);

      const { client } = serviceOrderSuccessAction.response.data.service_order;

      if (client) {
        return dispatch(loadFocalProfiles({
          filter: {
            'client.id': { eq: client.id },
          },
        }));
      }

      return undefined;
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
      return undefined;
    }
  },
}]);

const reduxConnect = connect(state => ({
  validationErrors: state.serviceOrders.validationErrors,
  choices: state.serviceOrders.choices,
  serviceGroupChoices: state.serviceGroups.choices,
  clients: getClients(state),
  users: getUsers(state),
  industries: getIndustries(state),
  serviceOrder: getCurrentServiceOrder(state),
  focalProfiles: getFocalProfiles(state),
  services: getServices(state),
  usersData: state.users.data,
  summaryOfCosts: getSummaryOfCosts(state),
  serviceGroupsValidationErrors: state.serviceGroups.validationErrorsPerId,
  serviceInstanceValidationErrors: state.serviceInstances.validationErrorsPerId,
  adjustmentValidationErrors: state.adjustments.validationErrorsPerId,
}), {
  onDelete: deleteServiceOrderTrigger,
  onFieldChange: editServiceOrderFormChange,

  onEditServiceGroup: editServiceGroupFieldChange,
  onAddServiceGroup: createServiceGroup,
  onDeleteServiceGroup: deleteServiceGroupTrigger,

  onEditServiceInstance: editServiceInstanceFieldChange,
  onAddServiceInstance: createServiceInstance,
  onDeleteServiceInstance: deleteServiceInstanceTrigger,

  onEditAdjustment: editAdjustmentFieldChange,
  onAddAdjustment: createAdjustment,
  onDeleteAdjustment: deleteAdjustmentTrigger,
});

const propsEnhancer = withPropsOnChange(['serviceOrder'], ({ serviceOrder }) => ({
  breadcrumbs: [{
    label: 'Service Orders',
    url: '/service-orders',
  }, {
    label: serviceOrder.composite_id,
  }],
  // initialValues used by reduxForm
  initialValues: serviceOrder,
}));

const reduxFormEnhancer = reduxForm({
  pure: true,
  enableReinitialize: true,
  form: 'editServiceOrderForm',
});

const handlersEnhancer = withHandlers({
  onDelete: ({ onDelete, serviceOrder }) => () => onDelete(serviceOrder.id),
  onFieldChange: ({ onFieldChange, serviceOrder }) => () => onFieldChange(serviceOrder.id),
});

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  propsEnhancer,
  reduxFormEnhancer,
  handlersEnhancer,
  pure,
);
