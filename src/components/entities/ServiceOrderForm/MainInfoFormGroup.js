import { FormGroup } from 'reactstrap';
import { pure } from 'recompose';
import { Field } from 'redux-form';
import { object, func, bool } from 'prop-types';

import { ReduxSelect, ReduxDirtiable, ReduxInput, Select } from 'src/components';
import { selectOptionsType } from 'src/prop-types';

const propTypes = {
  isNew: bool,
  clientOptions: selectOptionsType.isRequired,
  statusOptions: selectOptionsType.isRequired,
  paymentOptions: selectOptionsType.isRequired,
  focalProfileOptions: selectOptionsType.isRequired,
  validationErrors: object.isRequired,

  onFieldChange: func.isRequired,
};

const enhance = pure;

const MainInfoFormGroup = ({
  isNew,
  clientOptions,
  statusOptions,
  paymentOptions,
  focalProfileOptions,
  validationErrors,

  onFieldChange,
}) => (
  <FormGroup tag="fieldset">
    <FormGroup>
      <label>Client</label>
      <Field
        component={ReduxSelect}
        name="client"
        options={clientOptions}
        onChange={onFieldChange}
        error={validationErrors.client}
        disabled={!isNew}
      />
    </FormGroup>
    <FormGroup>
      <label>Custom Title</label>
      <Field
        component={ReduxDirtiable}
        dirtiableType="input"
        name="custom_title"
        onChange={onFieldChange}
        error={validationErrors.custom_title}
        format={null}
      />
    </FormGroup>
    <FormGroup>
      <label>Status</label>
      <Field
        component={ReduxSelect}
        name="status"
        options={statusOptions}
        onChange={onFieldChange}
        error={validationErrors.status}
      />
    </FormGroup>
    <FormGroup>
      <label>Payment Status</label>
      <Field
        component={ReduxSelect}
        name="payment"
        options={paymentOptions}
        onChange={onFieldChange}
        error={validationErrors.payment}
      />
    </FormGroup>
    <FormGroup>
      <label>Focal (<em>not working</em>)</label>
      <Select options={focalProfileOptions} disabled={isNew} />
    </FormGroup>
    <FormGroup>
      <label>Notes</label>
      <Field
        component={ReduxInput}
        name="notes"
        type="textarea"
        onBlur={onFieldChange}
        error={validationErrors.notes}
      />
    </FormGroup>
  </FormGroup>
);

MainInfoFormGroup.propTypes = propTypes;


export default enhance(MainInfoFormGroup);
