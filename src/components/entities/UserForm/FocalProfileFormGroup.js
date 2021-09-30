import { FormGroup } from 'reactstrap';
import { Field } from 'redux-form';
import { pure } from 'recompose';
import { object, func } from 'prop-types';

import { ReduxSelect, ReduxCheckbox } from 'src/components';
import { selectOptionsType } from 'src/prop-types';

const propTypes = {
  clientOptions: selectOptionsType.isRequired,
  validationErrors: object.isRequired,

  onFieldChange: func.isRequired,
};

const enhance = pure;

const FocalProfileFormGroup = ({
  clientOptions,
  validationErrors,

  onFieldChange,
}) => (
  <FormGroup tag="fieldset">
    <legend>Focal</legend>
    <FormGroup>
      <label>Associated Client</label>
      <Field
        component={ReduxSelect}
        name="profile.client"
        onChange={onFieldChange}
        options={clientOptions}
        error={validationErrors.name}
      />
    </FormGroup>
    <FormGroup>
      <Field
        component={ReduxCheckbox}
        name="profile.is_default"
        label="Is Default"
        onChange={onFieldChange}
        error={validationErrors.name}
      />
    </FormGroup>
  </FormGroup>
);

FocalProfileFormGroup.propTypes = propTypes;

export default enhance(FocalProfileFormGroup);
