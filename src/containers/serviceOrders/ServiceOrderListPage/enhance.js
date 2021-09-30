import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { compose, pure, withPropsOnChange } from 'recompose';

// actions
import {
  loadServiceOrders,
  listFiltersChange,
  loadServiceOrderChoices,
  pageChange,
} from 'src/redux/serviceOrders/actions';

// selectors
import { getServiceOrders } from 'src/redux/serviceOrders/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: ({
    store: { dispatch },
    location: { query: { client, sort, page, per_page, status } },
  }) => Promise.all([
    dispatch(loadServiceOrderChoices()),
    dispatch(loadServiceOrders({
      page,
      per_page: per_page || 10,
      sort: sort ? [sort] : ['-created'],
      include: ['client'],
      filter: {
        ...(status ? {
          status: {
            eq: status,
          },
        } : {}),
        ...(client ? {
          'client.name': {
            icontains: client,
          },
        } : {}),
      },
    })),
  ]),
}]);

const reduxConnect = connect(
  state => ({
    serviceOrders: getServiceOrders(state),
    choices: state.serviceOrders.choices,
    clientsData: state.clients.data,
    pageCount: state.serviceOrders.pageCount,
  }),
  {
    onLoadServiceOrders: loadServiceOrders,
    onFiltersChange: listFiltersChange,
    onPageChange: pageChange,
  },
  null,
  { pure: true },
);


const propsEnhancer = withPropsOnChange(['location'], ({
  location: { query: { client, sort, page, per_page, status } },
}) => ({
  filters: { client, sort, per_page, status },
  page: +page || 1,
}));

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  propsEnhancer,
  pure,
);
