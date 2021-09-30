import { FormGroup } from 'reactstrap';
import { Field } from 'redux-form';
import { pure } from 'recompose';
import { objectOf, object, func } from 'prop-types';

import { assetType } from 'src/prop-types';
import { ReduxInput, ReduxRichText, ReduxAsset } from 'src/components';

const propTypes = {
  assetsData: objectOf(assetType).isRequired,
  validationErrors: object.isRequired,

  onUpload: func.isRequired,
  onFieldChange: func.isRequired,
};

const enhance = pure;

const RhinoProfileFormGroup = ({
  assetsData,
  validationErrors,

  onUpload,
  onFieldChange,
}) => (
  <FormGroup tag="fieldset">
    <legend>Rhino</legend>

    <FormGroup>
      <label>Speciality</label>
      <Field
        component={ReduxInput}
        type="text"
        name="speciality"
        placeholder="Speciality"
        onBlur={onFieldChange}
        error={validationErrors.email}
      />
    </FormGroup>
    <FormGroup>
      <label>Biography Blurb</label>
      <Field
        component={ReduxRichText}
        name="bio"
        placeholder="Biography Blurb"
        onBlur={onFieldChange}
        error={validationErrors.email}
      />
    </FormGroup>
    <FormGroup>
      <label>Profile Picture</label>
      <Field
        component={ReduxAsset}
        name="profile_pic"
        type="image"
        assetsData={assetsData}
        onUpload={onUpload}
        onChange={onFieldChange}
        error={validationErrors.email}
      />
    </FormGroup>
  </FormGroup>
);

RhinoProfileFormGroup.propTypes = propTypes;

export default enhance(RhinoProfileFormGroup);
