import { compose, pure, withHandlers, withState, withPropsOnChange } from 'recompose';
import { number, string, func, bool } from 'prop-types';

import { RichText, Button } from 'src/components';
import { reduxFormInputType } from 'src/prop-types';

import RichTextListItem from './RichTextListItem';
import css from './style.css';

const propTypes = {
  input: reduxFormInputType.isRequired,
  editIndex: number,
  editorValue: string.isRequired,
  isEditing: bool.isRequired,

  onSetEditIndex: func.isRequired,
  onEditorValueChange: func.isRequired,
  onEdit: func.isRequired,
  onCancel: func.isRequired,
  onAdd: func.isRequired,
  onRemove: func.isRequired,
};

const editorValueEnhancer = withState('editorValue', 'onEditorValueChange', '');
const editingIndexEnhancer = withState('editIndex', 'onSetEditIndex');

const handlersEnhancer = withHandlers({
  onAdd: ({ editorValue, onEditorValueChange, input: { value, onChange } }) => () => {
    onChange([
      ...value,
      editorValue,
    ]);

    onEditorValueChange('');
  },

  onEdit: ({
    input: { onChange, value }, editIndex, editorValue, onSetEditIndex, onEditorValueChange,
  }) => () => {
    onChange([
      ...value.slice(0, editIndex),
      editorValue,
      ...value.slice(editIndex + 1),
    ]);

    onSetEditIndex(null);
    onEditorValueChange('');
  },

  onSetEditIndex: ({ onSetEditIndex, onEditorValueChange, input: { value } }) => (index) => {
    onEditorValueChange(value[index]);
    onSetEditIndex(index);
  },

  onRemove: ({ input: { value, onChange } }) => (index) => {
    onChange([
      ...value.slice(0, index),
      ...value.slice(index + 1),
    ]);
  },

  onCancel: ({ onSetEditIndex, onEditorValueChange }) => () => {
    onSetEditIndex(null);
    onEditorValueChange('');
  },
});

const propsEnhancer = withPropsOnChange(['editIndex'], ({ editIndex }) => ({
  isEditing: typeof editIndex === 'number',
}));

const enhance = compose(
  editingIndexEnhancer,
  editorValueEnhancer,
  handlersEnhancer,
  propsEnhancer,
  pure,
);

const ReduxRichTextList = ({
  input: { value },
  editIndex,
  editorValue,
  isEditing,

  onSetEditIndex,
  onEditorValueChange,
  onEdit,
  onCancel,
  onAdd,
  onRemove,
}) => (
  <div className={css.wrapper}>

    {/* eslint-disable react/no-array-index-key */}
    {value.map((item, index) => (

      <RichTextListItem
        key={index}
        index={index}
        html={item}
        editIndex={editIndex}
        onSetEditIndex={onSetEditIndex}
        onRemove={onRemove}
      />
    ))}
    {/* eslint-enable react/no-array-index-key */}
    <RichText onChange={onEditorValueChange} value={editorValue} className={css.editor} />
    <Base exists={!isEditing} component={Button} onClick={onAdd}>Add</Base>
    <Base exists={isEditing} component={Button} onClick={onEdit}>Save</Base>{' '}
    <Base exists={isEditing} component={Button} onClick={onCancel}>Cancel</Base>
  </div>
);

ReduxRichTextList.propTypes = propTypes;

export default enhance(ReduxRichTextList);
