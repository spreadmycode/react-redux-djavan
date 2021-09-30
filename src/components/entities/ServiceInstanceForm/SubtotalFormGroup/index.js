import { FormGroup } from 'reactstrap';
import { Field } from 'redux-form';
import { compose, pure, withState, withPropsOnChange } from 'recompose';
import { number, object, func } from 'prop-types';

import { formatMoney } from 'src/helpers';
import { ReduxInput, ReduxHidden } from 'src/components';

import css from './style.css';

const propTypes = {
  totalDue: number.isRequired,
  validationErrors: object.isRequired,

  onFieldChange: func.isRequired,
  onSetUnitPrice: func.isRequired,
  onSetNumberOfHours: func.isRequired,
};

const unitPriceEnhancer = withState('unitPrice', 'onSetUnitPrice', 0);
const numberOfHoursEnhancer = withState('numberOfHours', 'onSetNumberOfHours', 0);

const propsEnhancer = withPropsOnChange(
  ['unitPriceEnhancer', 'numberOfHours'],
  ({ unitPrice, numberOfHours }) => ({
    totalDue: unitPrice * numberOfHours,
  }),
);

const enhance = compose(
  unitPriceEnhancer,
  numberOfHoursEnhancer,
  propsEnhancer,
  pure,
);

const SubtotalFormGroup = ({
  totalDue,
  validationErrors,

  onFieldChange,
  onSetUnitPrice,
  onSetNumberOfHours,
}) => (
  <FormGroup className={css.container}>
    <Field name="unit_price" component={ReduxHidden} onFill={onSetUnitPrice} />
    <Field name="number_of_hours" component={ReduxHidden} onFill={onSetNumberOfHours} />

    <div className={css.unitPrice}>
      <Field
        component={ReduxInput}
        name="unit_price"
        onBlur={onFieldChange}
        addonPre="$"
        parse={parseInt}
        error={validationErrors.unit_price}
      />
    </div>
    <div className={css.ex}>x</div>
    <div className={css.numberOfHours}>
      <Field
        component={ReduxInput}
        name="number_of_hours"
        type="number"
        addonPost="hrs"
        error={validationErrors.number_of_hours}
        parse={parseInt}

        onBlur={onFieldChange}
      />
    </div>
    <div className={css.eq}>=</div>
    <div className={css.total}>
      <strong>{formatMoney(totalDue)}</strong>
      {' '}subtotal
    </div>
  </FormGroup>
);

SubtotalFormGroup.propTypes = propTypes;

export default enhance(SubtotalFormGroup);
