import { omit } from 'lodash';
import { pure } from 'recompose';
import { string } from 'prop-types';

import { PriorityVote } from 'src/components';
import { reduxFormInputType } from 'src/prop-types';

const propTypes = {
  input: reduxFormInputType.isRequired,
  error: string,
};

const enhance = pure;

const ReduxPriorityVote = ({
  input: { value, onChange },
  ...props
}) => (
  <PriorityVote
    value={value}
    onChange={onChange}
    {...omit(props, 'meta')}
  />
);

ReduxPriorityVote.propTypes = propTypes;

export default enhance(ReduxPriorityVote);
