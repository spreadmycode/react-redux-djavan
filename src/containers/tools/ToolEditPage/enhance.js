import { compose, pure, withPropsOnChange, withHandlers } from 'recompose';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

// actions
import { loadSingleTool, deleteToolTrigger, editToolFormChange, loadToolChoices } from 'src/redux/tools/actions';
import { loadServices } from 'src/redux/services/actions';

// selectors
import { getCurrentTool } from 'src/redux/tools/selectors';
import { getServices } from 'src/redux/services/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: ({ store: { dispatch }, params: { toolId } }) => Promise.all([
    dispatch(loadToolChoices()),
    dispatch(loadSingleTool(toolId)),
    dispatch(loadServices()),
  ]),
}]);

const reduxConnect = connect(state => ({

  tool: getCurrentTool(state),
  services: getServices(state),
  choices: state.tools.choices,
  validationErrors: state.tools.validationErrors,
}), {
  onDelete: deleteToolTrigger,
  onFieldChange: editToolFormChange,
});

const propsEnhancer = withPropsOnChange(['tool'], ({ tool }) => ({
  breadcrumbs: [{
    label: 'Tools',
    url: '/tools',
  }, {
    label: tool.name,
  }],
  // initialValues used by reduxForm
  initialValues: tool,
}));

const reduxFormEnhancer = reduxForm({
  pure: true,
  enableReinitialize: true,
  form: 'editToolForm',
});

const handlersEnhancer = withHandlers({
  onDelete: ({ onDelete, tool }) => () => onDelete(tool.id),
  onFieldChange: ({ onFieldChange, tool }) => () => onFieldChange(tool.id),
});

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  propsEnhancer,
  reduxFormEnhancer,
  handlersEnhancer,
  pure,
);
