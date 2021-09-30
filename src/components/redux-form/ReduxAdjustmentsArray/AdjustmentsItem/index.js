import { Field } from 'redux-form';
import { compose, pure, withStateHandlers, withHandlers, withPropsOnChange } from 'recompose';
import classNames from 'classnames';
import { string, func } from 'prop-types';

import { ReduxOutputText, ReduxHidden, Button, Icon } from 'src/components';
import { formatAdjustment } from 'src/helpers';

import css from './style.css';

const propTypes = {
  member: string.isRequired,
  displayValue: string.isRequired,
  className: string.isRequired,

  onSetId: func.isRequired,
  onSetValue: func.isRequired,
  onSetModifier: func.isRequired,
  onDoubleClick: func.isRequired,
  onDelete: func.isRequired,
};

const stateEnhancer = withStateHandlers({
  modifier: '+',
  value: 0,
}, {
  onSetId: () => id => ({ id }),
  onSetModifier: () => modifier => ({ modifier }),
  onSetValue: () => value => ({ value }),
});

const handlersEnhancer = withHandlers({
  onDoubleClick: ({ onSetEditingIndex, index }) => () => onSetEditingIndex(index),
  onDelete: ({ onDelete, id }) => () => onDelete(id),
});

const displayValueEnhancer = withPropsOnChange(
  ['modifier', 'value'],
  ({ modifier, value }) => ({
    displayValue: formatAdjustment({ modifier, value }),
  }),
);

const propsEnhancer = withPropsOnChange(['index', 'editingIndex'], ({ index, editingIndex }) => ({
  className: classNames({
    [css.item]: true,
    [css.editingItem]: index === editingIndex,
  }),
}));

const enhance = compose(
  stateEnhancer,
  handlersEnhancer,
  displayValueEnhancer,
  propsEnhancer,
  pure,
);

const AdjustmentsItem = ({
  member,
  displayValue,
  className,

  onSetId,
  onSetValue,
  onSetModifier,
  onDoubleClick,
  onDelete,
}) => (
  <tr className={className} onDoubleClick={onDoubleClick}>
    <Field component={ReduxHidden} name={`${member}.id`} onFill={onSetId} />
    <Field component={ReduxHidden} name={`${member}.modifier`} onFill={onSetModifier} />
    <Field component={ReduxHidden} name={`${member}.value`} onFill={onSetValue} />
    <td>
      <h6>
        <Field component={ReduxOutputText} name={`${member}.label`} />
        <span className="float-right">{displayValue}</span>
      </h6>
      <p>
        <Field component={ReduxOutputText} name={`${member}.description`} />
        <Button onClick={onDelete} className="float-right">
          <Icon wb="close" />
        </Button>
      </p>
    </td>
  </tr>
);

AdjustmentsItem.propTypes = propTypes;

export default enhance(AdjustmentsItem);
