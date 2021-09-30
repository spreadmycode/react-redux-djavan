import { compose, pure, withPropsOnChange } from 'recompose';

import { Asset } from 'src/components';

const propsEnhancer = withPropsOnChange(
  ['input'], ({ input: { value, onChange } }) => ({ value, onChange }),
);

const enhance = compose(
  propsEnhancer,
  pure,
);

export default enhance(Asset);
