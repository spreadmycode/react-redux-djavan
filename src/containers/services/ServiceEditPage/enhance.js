import { compose, pure, withPropsOnChange, withHandlers } from 'recompose';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

// actions
import {
  loadService,
  deleteServiceTrigger,
  editServiceFormChange,
  loadServiceChoices,
} from 'src/redux/services/actions';
import { createAsset } from 'src/redux/assets/actions';

// selectors
import { getService } from 'src/redux/services/selectors';
import { getAssetsData } from 'src/redux/assets/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: ({ store: { dispatch }, params: { serviceId } }) => Promise.all([
    dispatch(loadService(serviceId)),
    dispatch(loadServiceChoices()),
  ]),
}]);

const reduxConnect = connect(state => ({
  validationErrors: state.services.validationErrors,
  choices: state.services.choices,
  service: getService(state),
  assetsData: getAssetsData(state),
}), {
  onDelete: deleteServiceTrigger,
  onFieldChange: editServiceFormChange,
  onUploadAsset: createAsset,
});

const propsEnhancer = withPropsOnChange(['service'], ({ service }) => ({
  breadcrumbs: [{
    label: 'Services',
    url: '/services',
  }, {
    label: service.name,
  }],
  // initialValues used by reduxForm
  initialValues: service,
}));

const reduxFormEnhancer = reduxForm({
  pure: true,
  form: 'editServiceForm',
});

const handlersEnhancer = withHandlers({
  onDelete: ({ onDelete, service }) => () => onDelete(service.id),
  onFieldChange: ({ onFieldChange, service }) => () => onFieldChange(service.id),
  upload: ({ upload, service }) => file => upload(file, service),
});

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  propsEnhancer,
  reduxFormEnhancer,
  handlersEnhancer,
  pure,
);
