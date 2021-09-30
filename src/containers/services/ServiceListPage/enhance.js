import { asyncConnect } from 'redux-connect';
import { compose, pure, withHandlers, withPropsOnChange } from 'recompose';
import { connect } from 'react-redux';

import { loadServices, editService, listFiltersChange } from 'src/redux/services/actions';
import { getServices } from 'src/redux/services/selectors';
import { getAssetsData } from 'src/redux/assets/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: ({
    store: { dispatch },
    location: { query: { contains } },
  }) => dispatch(loadServices({
    filter: contains ? {
      name: {
        icontains: contains,
      },
    } : {},
  })),
}]);

const reduxConnect = connect(
  store => ({
    services: getServices(store),
    assetsData: getAssetsData(store),
  }),
  {
    onEdit: editService,
    onLoadServices: loadServices,
    onFiltersChange: listFiltersChange,
  },
);

const handlersEnhancer = withHandlers({
  onEdit: ({ onEdit, onLoadServices }) => async (...args) => {
    await onEdit(...args);
    onLoadServices();
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
