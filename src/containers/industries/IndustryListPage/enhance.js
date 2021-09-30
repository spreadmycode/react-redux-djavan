import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { compose, pure, withPropsOnChange } from 'recompose';

// actions
import { loadIndustries, listFiltersChange } from 'src/redux/industries/actions';

// selectors
import { getIndustries } from 'src/redux/industries/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: ({
    store: { dispatch },
    location: { query: { contains } },
  }) => dispatch(loadIndustries({
    include: ['clients', 'service_orders'],
    filter: contains ? {
      name: {
        icontains: contains,
      },
    } : {},
  })),
}]);

const reduxConnect = connect(
  state => ({
    industries: getIndustries(state),
  }),
  {
    onLoadIndustries: loadIndustries,
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
