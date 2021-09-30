import { Col, Row, Form } from 'reactstrap';
import { object, func, objectOf, string, bool } from 'prop-types';
import { Field } from 'redux-form';

import { ReduxHidden } from 'src/components';
import { assetType, selectOptionsType } from 'src/prop-types';

import CommonFieldsFormGroup from './CommonFieldsFormGroup';
import RhinoProfileFormGroup from './RhinoProfileFormGroup';
import FocalProfileFormGroup from './FocalProfileFormGroup';
import enhance from './enhance';

const propTypes = {
  isNew: bool,
  profileType: string.isRequired,
  assetsData: objectOf(assetType).isRequired,
  clientOptions: selectOptionsType.isRequired,
  validationErrors: object.isRequired,

  onUpload: func.isRequired,
  onFieldChange: func.isRequired,
  onSetProfileType: func.isRequired,
};

const UserForm = ({
  isNew,
  profileType,
  assetsData,
  clientOptions,
  validationErrors,

  onUpload,
  onFieldChange,
  onSetProfileType,
}) => (
  <Form>
    <Field component={ReduxHidden} onFill={onSetProfileType} name="profile.entity_type" />
    <Row>
      <Col md="6">
        <CommonFieldsFormGroup
          isNew={isNew}
          validationErrors={validationErrors}
          onFieldChange={onFieldChange}
          onSetProfileType={onSetProfileType}
        />
      </Col>
      <Col md="6">
        <Base
          exists={profileType === 'rhino_profile'}
          component={RhinoProfileFormGroup}
          assetsData={assetsData}
          validationErrors={validationErrors}
          onFieldChange={onFieldChange}
          onUpload={onUpload}
        />
        <Base
          exists={profileType === 'focal_profile'}
          component={FocalProfileFormGroup}
          clientOptions={clientOptions}
          validationErrors={validationErrors}
          onFieldChange={onFieldChange}
        />
      </Col>
    </Row>
  </Form>
);

UserForm.propTypes = propTypes;

export default enhance(UserForm);
