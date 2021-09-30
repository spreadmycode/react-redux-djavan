import { UserAuthWrapper } from 'redux-auth-wrapper';
import { compose, withPropsOnChange, pure } from 'recompose';
import { asyncConnect } from 'redux-connect';
import { replace } from 'react-router-redux';
import cookie from 'react-cookie';
import { connect } from 'react-redux';

import { refreshToken, logout } from 'src/redux/users/actions';
import { initialize } from 'src/redux/app/actions';

import pageMountEnhancer from 'src/enhancers/pageMountEnhancer';

const authHOC = UserAuthWrapper({
  authSelector: state => state.users,
  failureRedirectPath: '/login',
  redirectAction: replace,
  wrapperDisplayName: 'UserIsAuthenticated',
  predicate: users => users.me,
});

const reduxAsyncConnect = asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const { me } = getState().users;
    const token = cookie.load('token');

    if (!me && token) {
      return dispatch(refreshToken(token));
    }

    return undefined;
  },
}]);

const reduxConnect = connect(
  null,
  {
    onInitialize: initialize,
    onLogoutRequest: logout,
  },
);

const propsEnhancer = withPropsOnChange(['location'], ({ location }) => {
  const category = location.pathname.split('/')[1];

  if (['tools', 'issuers', 'services', 'industries', 'document-templates', 'users'].includes(category)) {
    return { activeCategory: 'settings' };
  }

  if (category === '') {
    return { activeCategory: 'dashboard' };
  }

  return { activeCategory: category };
});

export default compose(
  reduxAsyncConnect,
  authHOC,
  reduxConnect,
  propsEnhancer,
  pageMountEnhancer,
  pure,
);
