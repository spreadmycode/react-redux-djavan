import { compose, pure, withPropsOnChange, withHandlers } from 'recompose';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

// actions
import {
  loadSingleServiceInstance,
  deleteServiceInstanceTrigger,
  editServiceInstanceFieldChange,
  loadDocumentTemplateChoices,
} from 'src/redux/serviceInstances/actions';
import { loadServices } from 'src/redux/services/actions';
import {
  editAdjustmentFieldChange,
  createAdjustment,
  deleteAdjustmentTrigger,
} from 'src/redux/adjustments/actions';
import { createAsset } from 'src/redux/assets/actions';

// selectors
import { getCurrentServiceInstance } from 'src/redux/serviceInstances/selectors';
import { getServices } from 'src/redux/services/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: ({
    store: { dispatch },
    params: { serviceInstanceId },
  }) => Promise.all([
    dispatch(loadSingleServiceInstance(serviceInstanceId)),
    dispatch(loadServices()),
    dispatch(loadDocumentTemplateChoices()),
  ]),
}]);

const reduxConnect = connect(state => ({
  validationErrors: state.serviceInstances.validationErrors,
  serviceInstance: getCurrentServiceInstance(state),
  services: getServices(state),
  adjustmentValidationErrors: state.adjustments.validationErrorsPerId,
  assetsData: state.assets.data,
  choices: state.serviceInstances.choices,
}), {
  onDelete: deleteServiceInstanceTrigger,
  onFieldChange: editServiceInstanceFieldChange,

  onEditAdjustment: editAdjustmentFieldChange,
  onAddAdjustment: createAdjustment,
  onDeleteAdjustment: deleteAdjustmentTrigger,

  onUploadAsset: createAsset,
});

const propsEnhancer = withPropsOnChange(['serviceInstance'], ({ serviceInstance }) => ({
  breadcrumbs: [{
    label: 'Service Orders',
    url: '/service-orders',
  }, {
    label: serviceInstance.service_order.composite_id,
    url: `/service-orders/${serviceInstance.service_order.id}`,
  }, {
    label: serviceInstance.display_name,
  }],
  // initialValues used by reduxForm
  initialValues: serviceInstance,
}));

const reduxFormEnhancer = reduxForm({
  pure: true,
  enableReinitialize: true,
  form: 'editServiceInstanceForm',
});

const handlersEnhancer = withHandlers({
  onDelete: ({ onDelete, serviceInstance }) => () => onDelete(serviceInstance.id, true),
  onFieldChange: ({ onFieldChange, serviceInstance }) => () => onFieldChange(serviceInstance.id),
});

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  propsEnhancer,
  reduxFormEnhancer,
  handlersEnhancer,
  pure,
);
