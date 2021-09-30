import { compose, pure, withState, withHandlers } from 'recompose';
import { Field } from 'redux-form';
import { Col, Row, FormGroup } from 'reactstrap';
import { bool, object, func } from 'prop-types';

import { ReduxInput, ReduxSelect, ReduxOutputText, Button } from 'src/components';
import { formatTime } from 'src/helpers';

import ChangePasswordModal from './ChangePasswordModal';

const formatDate = d => (formatTime(d).date() || '-');

const typeOptions = [
  { value: 'rhino_profile', label: 'Rhino' },
  { value: 'focal_profile', label: 'Focal' },
  { value: 'wrong', label: 'Wrong (test)' },
];

const propTypes = {
  isNew: bool,
  isChangePasswordModalOpen: bool.isRequired,
  validationErrors: object.isRequired,

  onFieldChange: func.isRequired,
  onOpenPasswordModal: func.isRequired,
  onClosePasswordModal: func.isRequired,
};

const isChangePasswordModalOpenEnhancer = withState('isChangePasswordModalOpen', 'onTogglePasswordModal', false);

const handlersEnhancer = withHandlers({
  onOpenPasswordModal: ({ onTogglePasswordModal }) => () => onTogglePasswordModal(true),
  onClosePasswordModal: ({ onTogglePasswordModal }) => () => onTogglePasswordModal(false),
});

const enhance = compose(
  isChangePasswordModalOpenEnhancer,
  handlersEnhancer,
  pure,
);

const CommonFieldsFormGroup = ({
  isNew,
  isChangePasswordModalOpen,
  validationErrors,

  onFieldChange,
  onOpenPasswordModal,
  onClosePasswordModal,
}) => (
  <FormGroup tag="fieldset">
    <ChangePasswordModal
      isOpen={isChangePasswordModalOpen}
      onClosePasswordModal={onClosePasswordModal}
    />
    <FormGroup>
      <Row>
        <Col md="6">
          <em>
          Created {' '}
            <Field component={ReduxOutputText} name="profile.created" format={formatDate} />
          </em>
        </Col>
        <Col md="6">
          <em>
            Modified {' '}
            <Field component={ReduxOutputText} name="profile.last_modified" format={formatDate} />
          </em>
        </Col>
      </Row>
    </FormGroup>
    <FormGroup>
      <label>Profile Type</label>
      <Field
        component={ReduxSelect}
        name="profile.entity_type"
        searchable={false}
        clearable={false}
        disabled={!isNew}
        onChange={onFieldChange}
        options={typeOptions}
        error={validationErrors.name}
      />
    </FormGroup>
    <FormGroup>
      <label>Email</label>
      <Field
        component={ReduxInput}
        type="text"
        name="email"
        placeholder="Email"
        onBlur={onFieldChange}
        error={validationErrors.email}
      />
    </FormGroup>
    <FormGroup>
      <label>Profile Title</label>
      <Field
        component={ReduxInput}
        type="text"
        name="profile.title"
        placeholder="Profile Title"
        onBlur={onFieldChange}
        error={validationErrors.email}
      />
    </FormGroup>
    <FormGroup>
      <label>First Name</label>
      <Field
        component={ReduxInput}
        type="text"
        name="first_name"
        placeholder="First Name"
        onBlur={onFieldChange}
        error={validationErrors.first_name}
      />
    </FormGroup>
    <FormGroup>
      <label>Last Name</label>
      <Field
        component={ReduxInput}
        type="text"
        name="last_name"
        placeholder="Last Name"
        onBlur={onFieldChange}
        error={validationErrors.last_name}
      />
    </FormGroup>
    <FormGroup>
      <label>Profile Phone</label>
      <Field
        component={ReduxInput}
        type="text"
        name="profile.phone"
        placeholder="Profile Phone"
        onBlur={onFieldChange}
        error={validationErrors.email}
      />
    </FormGroup>
    <FormGroup>
      <Button
        onClick={onOpenPasswordModal}
        disabled={isNew}
      >
      Change Password
    </Button>
    </FormGroup>
  </FormGroup>
);

CommonFieldsFormGroup.propTypes = propTypes;

export default enhance(CommonFieldsFormGroup);
