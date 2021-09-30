import { pure } from 'recompose';
import { oneOfType, string, arrayOf, func } from 'prop-types';

import css from './style.css';

const propTypes = {
  error: oneOfType([string, arrayOf(string)]),
  className: string,
  component: oneOfType([string, func]),
};

const enhance = pure;

const FieldError = ({ error, className, component }) => (
  <Base
    exists={error}
    component={component || 'div'}
    className={`${css.error} ${className || ''}`}
  >
    {error}
  </Base>
);

FieldError.propTypes = propTypes;

export default enhance(FieldError);
