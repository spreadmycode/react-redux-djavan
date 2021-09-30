import { compose, pure, withStateHandlers, withHandlers, withPropsOnChange } from 'recompose';

import { empty } from 'src/helpers';

const stateEnhancer = withStateHandlers(
  {
    id: null,
    sort_priority: null,
    value: 0,
    modifier: '+',
    label: '',
    description: '',
  },
  {
    onSetId: () => id => ({ id }),
    onSetSortPriority: () => sort_priority => ({ sort_priority }),
    onSetValue: () => value => ({ value }),
    onSetModifier: () => modifier => ({ modifier }),
    onSetLabel: () => label => ({ label }),
    onSetDescription: () => description => ({ description }),
  },
  );

const propsEnhancer = withPropsOnChange(
  ['adjustmentValidationErrors', 'id', 'isEditing'],
  ({ adjustmentValidationErrors, id, isEditing }) => ({
    validationErrors: adjustmentValidationErrors[isEditing ? id : 'new'] || empty,
  }),
);

const resetHandlerEnhancer = withHandlers({
  onReset: ({
    onSetId, onSetSortPriority, onSetValue, onSetModifier, onSetLabel, onSetDescription,
  }) => () => {
    onSetId(null);
    onSetSortPriority(null);
    onSetValue(0);
    onSetModifier('+');
    onSetLabel('');
    onSetDescription('');
  },
});

const handlersEnhancer = withHandlers({
  onAdd: ({ onAdd, onReset, value, modifier, label, description }) => async () => {
    const { response } = await onAdd({
      value: +value,
      modifier,
      label,
      description,
    });

    // :(
    if (response.data && response.data.adjustment) {
      onReset();
    }
  },
  onEdit: ({
    onEdit,
    onReset,
    onCancel,
    id,
    sort_priority,
    value,
    modifier,
    label,
    description,
  }) => async () => {
    const { response } = await onEdit(id, {
      sort_priority,
      value,
      modifier,
      label,
      description,
    });

    if (response.data && response.data.adjustment) {
      onReset();
      onCancel();
    }
  },
});

export default compose(
  stateEnhancer,
  propsEnhancer,
  resetHandlerEnhancer,
  handlersEnhancer,
  pure,
);
