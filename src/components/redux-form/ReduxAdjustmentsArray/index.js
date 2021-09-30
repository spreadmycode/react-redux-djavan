import { Table } from 'reactstrap';
import { compose, pure, withState, withPropsOnChange, withHandlers } from 'recompose';
import { object, bool, string, func, number } from 'prop-types';

import AdjustmentsItem from './AdjustmentsItem';
import AdjustmentFields from './AdjustmentFields';
import css from './style.css';

const propTypes = {
  fields: object.isRequired,
  adjustmentValidationErrors: object.isRequired,
  editingIndex: number,
  isEditing: bool.isRequired,
  edigingMember: string.isRequired,

  onDelete: func.isRequired,
  onEdit: func.isRequired,
  onAdd: func.isRequired,
  onCancel: func.isRequired,
  onSetEditingIndex: func.isRequired,
};

const editingIndexEnhancer = withState('editingIndex', 'onSetEditingIndex', null);

const propsEnhancer = withPropsOnChange(['fields', 'editingIndex'], ({ fields, editingIndex }) => ({
  edigingMember: `${fields.name}[${editingIndex}]`,
  isEditing: typeof editingIndex === 'number',
}));

const handlersEnhancer = withHandlers({
  onCancel: ({ onSetEditingIndex }) => () => onSetEditingIndex(null),
});

const enhance = compose(
  editingIndexEnhancer,
  propsEnhancer,
  handlersEnhancer,
  pure,
);

const ReduxAdjustmentsArray = ({
  fields,
  adjustmentValidationErrors,
  editingIndex,
  isEditing,
  edigingMember,

  onDelete,
  onEdit,
  onAdd,
  onCancel,
  onSetEditingIndex,
}) => (
  <div className={css.container}>
    <AdjustmentFields
      adjustmentValidationErrors={adjustmentValidationErrors}
      member={edigingMember}
      isEditing={isEditing}
      onEdit={onEdit}
      onAdd={onAdd}
      onCancel={onCancel}
    />
    <Table striped className={css.table}>
      <tbody>
        {fields.map((member, index) => (
          <AdjustmentsItem
            member={member}
            key={member}
            index={index}
            editingIndex={editingIndex}

            onDelete={onDelete}
            onEdit={onEdit}
            onSetEditingIndex={onSetEditingIndex}
          />
        ))}
      </tbody>
    </Table>
  </div>
);

ReduxAdjustmentsArray.propTypes = propTypes;

export default enhance(ReduxAdjustmentsArray);
