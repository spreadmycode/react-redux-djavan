import { DatePicker } from 'src/components';
import { omit } from 'lodash';

import { reduxFormInputType } from 'src/prop-types';

const propTypes = {
  input: reduxFormInputType.isRequired,
};

const ReduxDatePicker = ({
  input: { value, onChange },
  ...props
}) => (
  <DatePicker
    value={value}
    onChange={onChange}
    {...omit(props, ['meta'])}
  />
);

ReduxDatePicker.propTypes = propTypes;

export default ReduxDatePicker;
