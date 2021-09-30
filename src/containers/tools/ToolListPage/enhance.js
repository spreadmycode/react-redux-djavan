import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { compose, pure, withHandlers, withPropsOnChange } from 'recompose';

// actions
import { loadTools, listFiltersChange, editTool } from 'src/redux/tools/actions';

// selectors
import { getTools } from 'src/redux/tools/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: ({
    store: { dispatch },
    location: { query: { contains } },
  }) => dispatch(loadTools({
    filter: contains ? {
      name: {
        icontains: contains,
      },
    } : {},
  })),
}]);

const reduxConnect = connect(
  state => ({
    tools: getTools(state),
  }),
  {
    onEdit: editTool,
    onLoadTools: loadTools,
    onFiltersChange: listFiltersChange,
  },
  null,
  { pure: true },
);

const handlersEnhancer = withHandlers({
  onEdit: ({ onEdit, onLoadTools }) => async (...args) => {
    await onEdit(...args);
    onLoadTools();
  },
});

const propsEnhancer = withPropsOnChange(['location'], ({
  location: { query: { contains } },
}) => ({
  filters: { contains },
}));

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  handlersEnhancer,
  propsEnhancer,
  pure,
);
