import { connect } from 'react-redux';
import { compose, pure } from 'recompose';

import { initialize } from 'src/redux/app/actions';

import pageMountEnhancer from 'src/enhancers/pageMountEnhancer';

const reduxConnect = connect(
  null,
  {
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
