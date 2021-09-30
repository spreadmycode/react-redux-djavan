import { compose, pure, withPropsOnChange, withHandlers } from 'recompose';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

// actions
import { loadSingleIndustry, deleteIndustryTrigger, editIndustryFormChange } from 'src/redux/industries/actions';

// selectors
import { getCurrentIndustry } from 'src/redux/industries/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: ({
    store: { dispatch },
    params: { industryId },
  }) => dispatch(loadSingleIndustry(industryId)),
}]);

const reduxConnect = connect(state => ({
  validationErrors: state.industries.validationErrors,
  industry: getCurrentIndustry(state),
}), {
  onDelete: deleteIndustryTrigger,
  onFieldChange: editIndustryFormChange,
});

const propsEnhancer = withPropsOnChange(['industry'], ({ industry }) => ({
  breadcrumbs: [{
    label: 'Industries',
    url: '/industries',
  }, {
    label: industry.name,
  }],
  // initialValues used by reduxForm
  initialValues: industry,
}));

const reduxFormEnhancer = reduxForm({
  pure: true,
  enableReinitialize: true,
  form: 'editIndustryForm',
});

const handlersEnhancer = withHandlers({
  onDelete: ({ onDelete, industry }) => () => onDelete(industry.id),
  onFieldChange: ({ onFieldChange, industry }) => () => onFieldChange(industry.id),
});

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  propsEnhancer,
  reduxFormEnhancer,
  handlersEnhancer,
  pure,
);
