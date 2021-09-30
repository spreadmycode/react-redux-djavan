import { compose, pure, withHandlers, withPropsOnChange } from 'recompose';
import classNames from 'classnames';
import { string, func } from 'prop-types';

import formatTime from 'src/helpers/formatTime';

import css from './style.css';

const propTypes = {
  time: string.isRequired,
  user_email: string.isRequired,
  description: string.isRequired,
  className: string.isRequired,

  onDoubleClick: func.isRequired,
};

const handlersEnhancer = withHandlers({
  onDoubleClick: ({ onSetEditingRevisionIndex, index }) =>
    () => onSetEditingRevisionIndex(index),
});

const propsEnhancer = withPropsOnChange(['index', 'editingRevisionIndex'], ({ index, editingRevisionIndex }) => ({
  className: classNames({
    [css.row]: true,
    [css.active]: index === editingRevisionIndex,
  }),
}));

const enhance = compose(
  handlersEnhancer,
  propsEnhancer,
  pure,
);

const RevisionRow = ({
  time,
  user_email,
  description,
  className,

  onDoubleClick,
}) => (
  <tr className={className} onDoubleClick={onDoubleClick}>
    <td>{formatTime(time).date()}</td>
    <td>{user_email}</td>
    <td>{description}</td>
  </tr>
);

RevisionRow.propTypes = propTypes;

export default enhance(RevisionRow);
