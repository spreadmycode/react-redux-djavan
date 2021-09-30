import { omit } from 'lodash';
import { pure } from 'recompose';
import { string, oneOfType, arrayOf } from 'prop-types';

import { Input } from 'src/components';
import { reduxFormInputType } from 'src/prop-types';

const propTypes = {
  input: reduxFormInputType.isRequired,
  error: oneOfType([string, arrayOf(string)]),
  wrapperClassName: string,
};

const enhance = pure;

const ReduxInput = ({
  input,
  ...props
}) => (
  <Input
    {...input}
    {...omit(props, 'meta')}
  />
);

ReduxInput.propTypes = propTypes;

export default enhance(ReduxInput);
