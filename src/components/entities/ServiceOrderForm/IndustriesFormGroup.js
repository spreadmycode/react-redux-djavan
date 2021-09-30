import { pure } from 'recompose';
import { FormGroup } from 'reactstrap';
import { Field } from 'redux-form';
import { object, func } from 'prop-types';

import { ReduxAssociations } from 'src/components';
import { selectOptionsType } from 'src/prop-types';

const propTypes = {
  industryOptions: selectOptionsType.isRequired,
  validationErrors: object.isRequired,

  onFieldChange: func.isRequired,
};

const enhance = pure;

const IndustriesFormGroup = ({
  industryOptions,
  validationErrors,

  onFieldChange,
}) => (
  <FormGroup tag="fieldset">
    <legend>Associated Industries</legend>
    <Field
      component={ReduxAssociations}
      name="industries"
      options={industryOptions}
      onChange={onFieldChange}
      error={validationErrors.industries}
      disabled
    />
  </FormGroup>
);

IndustriesFormGroup.propTypes = propTypes;

export default enhance(IndustriesFormGroup);
