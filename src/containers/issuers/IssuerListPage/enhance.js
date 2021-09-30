import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { compose, pure, withPropsOnChange } from 'recompose';

// actions
import { loadIssuers, listFiltersChange } from 'src/redux/issuers/actions';

// selectors
import { getIssuers } from 'src/redux/issuers/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: ({
    store: { dispatch },
    location: { query: { contains } },
  }) => dispatch(loadIssuers({
    include: ['clients'],
    filter: contains ? {
      name: {
        icontains: contains,
      },
    } : {},
  })),
}]);

const reduxConnect = connect(
  state => ({
    issuers: getIssuers(state),
  }),
  {
    onLoadIssuers: loadIssuers,
    onFiltersChange: listFiltersChange,
  },
  null,
  { pure: true },
);


const propsEnhancer = withPropsOnChange(['location'], ({
  location: { query: { contains } },
}) => ({
  filters: { contains },
}));

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  propsEnhancer,
  pure,
);
