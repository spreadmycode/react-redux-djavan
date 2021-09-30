import { pure } from 'recompose';
import { FormGroup } from 'reactstrap';
import { Field } from 'redux-form';
import { func } from 'prop-types';

import { ReduxCheckbox } from 'src/components';

const propTypes = {
  onFieldChange: func.isRequired,
};

const enhance = pure;

const OptionsFormGroup = ({
  onFieldChange,
}) => (
  <FormGroup tag="fieldset">
    <legend>Options</legend>
    <Field
      component={ReduxCheckbox}
      label="Travel Required"
      name="travel_enabled"
      onChange={onFieldChange}
    />
    <Field
      component={ReduxCheckbox}
      label="Show Appendix C"
      name="appendix_c_enabled"
      onChange={onFieldChange}
    />
    <Field
      component={ReduxCheckbox}
      label="Include Vulnerability Spreadsheet"
      name="csv_enabled"
      onChange={onFieldChange}
    />
  </FormGroup>
);

OptionsFormGroup.propTypes = propTypes;

export default enhance(OptionsFormGroup);
