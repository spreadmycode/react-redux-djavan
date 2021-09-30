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

const FocalFormGroup = ({
  validationErrors,

  onFieldChange,
}) => (
  <FormGroup tag="fieldset">
    <legend>Focal</legend>
    <FormGroup>
      <Label>Focal First Name</Label>
      <Field
        component={ReduxInput}
        type="text"
        name="focal_first_name"
        placeholder="Focal First Name"
        onBlur={onFieldChange}
        error={validationErrors.focal_first_name}
      />
    </FormGroup>
    <FormGroup>
      <Label>Focal Last Name</Label>
      <Field
        component={ReduxInput}
        type="text"
        name="focal_last_name"
        placeholder="Focal Last Name"
        onBlur={onFieldChange}
        error={validationErrors.focal_last_name}
      />
    </FormGroup>
    <FormGroup>
      <Label>Focal Title</Label>
      <Field
        component={ReduxInput}
        type="text"
        name="focal_title"
        placeholder="Focal Title"
        onBlur={onFieldChange}
        error={validationErrors.focal_title}
      />
    </FormGroup>
    <FormGroup>
      <Label>Focal Phone</Label>
      <Field
        component={ReduxInput}
        type="text"
        name="focal_phone"
        placeholder="Focal Phone"
        onBlur={onFieldChange}
        error={validationErrors.focal_phone}
      />
    </FormGroup>
    <FormGroup>
      <Label>Focal Email</Label>
      <Field
        component={ReduxInput}
        type="text"
        name="focal_email"
        placeholder="Focal Email"
        onBlur={onFieldChange}
        error={validationErrors.focal_email}
      />
    </FormGroup>
  </FormGroup>
);

FocalFormGroup.propTypes = propTypes;

export default enhance(FocalFormGroup);
