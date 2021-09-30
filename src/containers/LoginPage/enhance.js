import { connect } from 'react-redux';
import { compose, pure } from 'recompose';

import { loginSubmit } from 'src/redux/users/actions';
import { initialize } from 'src/redux/app/actions';

import pageMountEnhancer from 'src/enhancers/pageMountEnhancer';

const reduxConnect = connect(
  state => ({
    validationErrors: state.users.validationErrors,
  }),
  {
    onSubmit: loginSubmit,
    onInitialize: initialize,
  },
  null,
  { pure: true },
);

export default compose(
  reduxConnect,
  pageMountEnhancer,
  pure,
);
