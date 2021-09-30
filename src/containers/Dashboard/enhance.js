import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { compose, pure } from 'recompose';

// selectors
import { getSessionUser } from 'src/redux/users/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: () => Promise.resolve(),
}]);

const reduxConnect = connect(
  state => ({
    me: getSessionUser(state),
  }),
  null,
  null,
  { pure: true },
);

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  pure,
);
