import { compose, pure, withPropsOnChange, withHandlers } from 'recompose';
import { string, func, oneOfType, arrayOf, bool } from 'prop-types';

import { Checkbox } from 'src/components';

const propTypes = {
  value: bool.isRequired,
  id: string.isRequired,
  label: string.isRequired,
  error: oneOfType([string, arrayOf(string)]),
  wrapperClassName: string,

  onChange: func.isRequired,
};

const propsEnhancer = withPropsOnChange(
  ['id', 'input'],
  ({ id, input: { value, name } }) => ({
    id: id || name,
    value: typeof value === 'undefined' || value === '' ? false : value,
  }),
);

const handlersEnhancer = withHandlers({
  onChange: ({ input: { onChange } }) => checked => onChange(checked),
});

const enhance = compose(
  propsEnhancer,
  handlersEnhancer,
  propsEnhancer,
  pure,
);

const ReduxCheckbox = ({
  value,
  ...props
}) => (
  <Checkbox checked={value} {...props} />
);

ReduxCheckbox.propTypes = propTypes;

export default enhance(ReduxCheckbox);
