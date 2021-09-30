import { compose, pure, withHandlers } from 'recompose';
import { string, number, func } from 'prop-types';

import { SafeHTML, Button, Icon } from 'src/components';

import css from './style.css';

const propTypes = {
  html: string.isRequired,
  editIndex: number,
  index: number.isRequired,
  onDoubleClick: func.isRequired,
  onRemove: func.isRequired,
};

const handlersEnhancer = withHandlers({
  onDoubleClick: ({ onSetEditIndex, index }) => (evt) => {
    evt.preventDefault();
    onSetEditIndex(index);
  },
  onRemove: ({ onRemove, index }) => () => onRemove(index),
});

const enhance = compose(
  handlersEnhancer,
  pure,
);

const RichTextListItem = ({
  html,
  editIndex,
  index,
  onDoubleClick,
  onRemove,
}) => (
  <div className={`${css.item} ${editIndex === index ? css.editingItem : ''}`}>
    <SafeHTML
      className={css.itemContent}
      html={html}
      onDoubleClick={onDoubleClick}
    />
    <Button color="primary" outline onClick={onRemove} className={css.remove}>
      <Icon wb="close" />
    </Button>
  </div>
);

RichTextListItem.propTypes = propTypes;

export default enhance(RichTextListItem);
