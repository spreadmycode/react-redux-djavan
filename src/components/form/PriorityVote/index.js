import { compose, pure, withHandlers, withPropsOnChange, defaultProps } from 'recompose';
import classNames from 'classnames';
import { func, number, string, bool } from 'prop-types';

import { Icon, FieldError } from 'src/components';

import css from './style.css';

const propTypes = {
  value: number,
  className: string.isRequired,
  error: string,
  showNumber: bool.isRequired,

  onVoteUp: func.isRequired,
  onVoteDown: func.isRequired,
};

const defaultPropsEnhancer = defaultProps({
  showNumber: true,
});

const handlersEnhancer = withHandlers({
  onVoteUp: ({ onChange, value }) => () => onChange(value - 1),
  onVoteDown: ({ onChange, value }) => () => onChange(value + 1),
});

const propsEnhancer = withPropsOnChange(['value', 'disabled'], ({ className, disabled, value }) => ({
  className: classNames({
    [className]: !!className,
    [css.vote]: true,
    [css.disabled]: disabled,
    [css.critical]: value <= 1,
  }),
}));

const enhance = compose(
  defaultPropsEnhancer,
  handlersEnhancer,
  propsEnhancer,
  pure,
);

const PriorityVote = ({
  value,
  className,
  error,
  showNumber,

  onVoteUp,
  onVoteDown,
}) => (
  <div className={className}>
    <Icon
      wb="chevron-up"
      className={`${css.voteButton} ${css.upVoteButton}`}
      onClick={onVoteUp}
    />
    <Base
      exists={showNumber}
      component="span"
    >
      {value || '–'}
    </Base>
    <Icon
      wb="chevron-down"
      className={css.voteButton}
      onClick={onVoteDown}
    />
    <FieldError error={error} />
  </div>
);

PriorityVote.propTypes = propTypes;

export default enhance(PriorityVote);
