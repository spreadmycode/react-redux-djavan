import { Input as ReactstrapInput } from 'reactstrap';
import { compose, pure, withHandlers, mapProps, withPropsOnChange } from 'recompose';
import { omit } from 'lodash';
import classNames from 'classnames';
import { string, oneOfType, arrayOf } from 'prop-types';

import { FieldError } from 'src/components';

import css from './style.css';

const propTypes = {
  error: oneOfType([string, arrayOf(string)]),
  wrapperClassName: string.isRequired,
  addonPre: string,
  addonPost: string,
};

const handlersEnhancer = withHandlers({
  onChange: ({ passValue, onChange }) => (evt) => {
    if (typeof onChange === 'function') {
      if (passValue) {
        return onChange(evt.target.value);
      }

      onChange(evt);
    }

    return undefined;
  },
  onKeyUp: ({ onKeyUp, onPressEnter }) => (evt) => {
    if (typeof onKeyUp === 'function') {
      onKeyUp(evt);
    }

    if (typeof onPressEnter === 'function') {
      if (evt.keyCode === 13) {
        evt.preventDefault();
        onPressEnter(evt);
      }
    }
  },
});

const propsEnhancer = withPropsOnChange(
  ['addonPre', 'addonPost', 'wrapperClassName', 'error'],
  ({ addonPre, addonPost, wrapperClassName, error }) => ({
    wrapperClassName: classNames({
      [wrapperClassName]: !!wrapperClassName,
      'input-group': addonPre || addonPost,
      [css.wrapperOnError]: !!error,
    }),
  }),
);

const omitPropsEnhancer = mapProps(props => omit(props, ['passValue', 'onPressEnter']));

const enhance = compose(
  handlersEnhancer,
  propsEnhancer,
  omitPropsEnhancer,
  pure,
);

const Input = ({
  error,
  wrapperClassName,
  addonPre,
  addonPost,
  ...props
}) => (
  <div className={wrapperClassName}>
    <Base exists={addonPre} className="input-group-addon">{addonPre}</Base>
    <ReactstrapInput {...props} />
    <Base exists={addonPost} className="input-group-addon" style={{ flexBreak: 'after' }}>{addonPost}</Base>
    <Base className={css.break} exists={error} />
    <FieldError error={error} />
  </div>
);

Input.propTypes = propTypes;

export default enhance(Input);
