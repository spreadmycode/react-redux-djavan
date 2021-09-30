import { pure } from 'recompose';
import { FormGroup, Label } from 'reactstrap';
import { Field } from 'redux-form';
import { object, func } from 'prop-types';

import { ReduxInput } from 'src/components';

const propTypes = {
  validationErrors: object,

  onFieldChange: func.isRequired,
};

const enhance = pure;

const ClientFormGroup = ({
  validationErrors,

  onFieldChange,
}) => (
  <FormGroup tag="fieldset">
    <legend>Client</legend>
    <FormGroup>
      <Label>Name</Label>
      <Field
        component={ReduxInput}
        type="text"
        name="name"
        placeholder="Name"
        onBlur={onFieldChange}
        error={validationErrors.name}
      />
    </FormGroup>
    <FormGroup>
      <Label>Short Name</Label>
      <Field
        component={ReduxInput}
        type="text"
        name="short_name"
        placeholder="Short Name"
        onBlur={onFieldChange}
        error={validationErrors.short_name}
      />
    </FormGroup>
    <FormGroup>
      <Label>URL</Label>
      <Field
        component={ReduxInput}
        type="text"
        name="url"
        placeholder="URL"
        onBlur={onFieldChange}
        error={validationErrors.url}
      />
    </FormGroup>
    <FormGroup>
      <Label>Hourly Rate</Label>
      <Field
        component={ReduxInput}
        type="text"
        name="hourly_rate"
        placeholder="Hourly Rate"
        onBlur={onFieldChange}
        error={validationErrors.hourly_rate}
      />
    </FormGroup>
    <FormGroup>
      <Label>Address</Label>
      <Field
        component={ReduxInput}
        type="textarea"
        name="address"
        placeholder="Address"
        onBlur={onFieldChange}
        error={validationErrors.address}
      />
    </FormGroup>
  </FormGroup>
);

ClientFormGroup.propTypes = propTypes;

export default enhance(ClientFormGroup);
