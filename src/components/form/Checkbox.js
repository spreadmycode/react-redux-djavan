import { compose, pure, withPropsOnChange, withHandlers } from 'recompose';
import { string, func, oneOfType, arrayOf, bool } from 'prop-types';
import classNames from 'classnames';

import { FieldError } from 'src/components';

const propTypes = {
  checked: bool.isRequired,
  id: string.isRequired,
  label: string.isRequired,
  error: oneOfType([string, arrayOf(string)]),
  wrapperClassName: string,

  onChange: func.isRequired,
};

const propsEnhancer = withPropsOnChange(['wrapperClassName'], ({ wrapperClassName }) => ({
  wrapperClassName: classNames({
    [wrapperClassName]: !!wrapperClassName,
    'checkbox-custom': true,
    'checkbox-primary': true,
  }),
}));

const handlersEnhancer = withHandlers({
  onChange: ({ onChange }) => ({ target }) => onChange(target.checked),
});

const enhance = compose(
  propsEnhancer,
  handlersEnhancer,
  pure,
);

const Checkbox = ({
  checked,
  id,
  label,
  error,
  wrapperClassName,

  onChange,
}) => (
  <div className={wrapperClassName}>
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={id}>{label}</label>
    <FieldError error={error} />
  </div>
);

Checkbox.propTypes = propTypes;

export default enhance(Checkbox);
