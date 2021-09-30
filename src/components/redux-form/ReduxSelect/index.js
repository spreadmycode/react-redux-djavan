import { pure } from 'recompose';
import { string, oneOfType, arrayOf } from 'prop-types';

import { FieldError, Select } from 'src/components';
import { reduxFormInputType } from 'src/prop-types';

const propTypes = {
  input: reduxFormInputType.isRequired,
  error: oneOfType([string, arrayOf(string)]),
};

const enhance = pure;

const ReduxSelect = ({
  input: { value, onChange },
  error,
  ...props
}) => (
  <div>
    <Select
      value={value}
      onChange={onChange}
      {...props}
    />
    <FieldError error={error} />
  </div>
);

ReduxSelect.propTypes = propTypes;

export default enhance(ReduxSelect);
