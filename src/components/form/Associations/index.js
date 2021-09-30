import { compose, pure, withPropsOnChange, withHandlers, withState } from 'recompose';
import Select from 'react-select';
import { without } from 'lodash';
import { string, number, func, oneOfType } from 'prop-types';

import { Icon, Button } from 'src/components';
import { selectOptionsType } from 'src/prop-types';

import css from './style.css';
import AssociationsItem from './AssociationsItem';

const propTypes = {
  items: selectOptionsType.isRequired,
  options: selectOptionsType.isRequired,
  selectedValue: oneOfType([string, number]),

  onSelect: func.isRequired,
  onAdd: func.isRequired,
  onRemove: func.isRequired,
};

const valueEnhancer = withState('selectedOption', 'onSelect', null);

const handlersEnhancer = withHandlers({
  onAdd: ({ values, onChange, onSelect, selectedOption }) => () => {
    if (selectedOption) {
      onChange([
        ...values,
        selectedOption.value,
      ]);

      onSelect(null);
    }
  },
  onRemove: ({ values, onChange }) => value => onChange(without(values, value)),
});

const propsEnhancer = withPropsOnChange(
  ['values', 'options', 'selectedOption'],
  ({ values, options, selectedOption }) => ({
    items: values.map((val) => {
      const option = options.find(({ value }) => value === val);

      if (!option) {
        return {
          value: val,
          label: <em>No label</em>,
        };
      }

      return option;
    }),
    options: options.filter(({ value }) => !values.includes(value)),
    selectedValue: selectedOption ? selectedOption.value : null,
  }),

);


const enhance = compose(
  valueEnhancer,
  handlersEnhancer,
  propsEnhancer,
  pure,
);

const Associations = ({
  items,
  options,
  selectedValue,

  onSelect,
  onAdd,
  onRemove,
}) => (
  <div>
    {items.map(({ value, label }) => (
      <AssociationsItem
        key={value + label}
        value={value}
        label={label}
        onRemove={onRemove}
      />
    ))}
    <div>
      <Select
        className={css.select}
        options={options}
        onBlurResetsInput={false}
        value={selectedValue}
        onChange={onSelect}
      />

      <Button color="primary" outline onClick={onAdd} className={css.add}>
        <Icon wb="plus" />
      </Button>
    </div>
  </div>
);

Associations.propTypes = propTypes;

export default enhance(Associations);
