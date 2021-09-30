import { asyncConnect } from 'redux-connect';
import { compose, pure, withPropsOnChange } from 'recompose';
import { connect } from 'react-redux';

import { loadUsers, listFiltersChange, pageChange } from 'src/redux/users/actions';
import { getUsers } from 'src/redux/users/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: ({
    store: { dispatch },
    location: { query: { profile_type, contains, per_page, sort, page } },
  }) => dispatch(loadUsers({
    page,
    per_page: per_page || 10,
    sort: sort ? [sort] : undefined,
    filter: Object.assign({},
      profile_type ? {
        'profile.profile_type': {
          eq: profile_type,
        },
      } : {},
      contains ? {
        name: {
          icontains: contains,
        },
      } : {},
    ),
    include: [],
  })),
}]);


const reduxConnect = connect(
  store => ({
    users: getUsers(store),
    pageCount: store.users.pageCount,
  }),
  {
    onFiltersChange: listFiltersChange,
    onPageChange: pageChange,
  },
  null,
  { pure: true },
);

const propsEnhancer = withPropsOnChange(['location'], ({
  location: { query: { profile_type, contains, sort, per_page, page } },
}) => ({
  filters: {
    profile_type,
    contains,
    sort,
    per_page,
  },
  page: +page || 1,
}));

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  propsEnhancer,
  pure,
);
