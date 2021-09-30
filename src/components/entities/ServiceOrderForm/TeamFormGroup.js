import { pure } from 'recompose';
import { FormGroup } from 'reactstrap';
import { Field } from 'redux-form';
import { object, func } from 'prop-types';

import { ReduxSelect, ReduxAssociations } from 'src/components';
import { selectOptionsType } from 'src/prop-types';

const propTypes = {
  userOptions: selectOptionsType.isRequired,
  validationErrors: object.isRequired,

  onFieldChange: func.isRequired,
};

const enhance = pure;

const TeamFormGroup = ({
  userOptions,
  validationErrors,

  onFieldChange,
}) => (
  <FormGroup tag="fieldset">
    <legend>Team</legend>
    <FormGroup>
      <label>Author</label>
      <Field
        component={ReduxSelect}
        name="author"
        options={userOptions}
        onChange={onFieldChange}
        error={validationErrors.author}
      />
    </FormGroup>
    <FormGroup>
      <label>Account Manager</label>
      <Field
        component={ReduxSelect}
        name="account_manager"
        options={userOptions}
        onChange={onFieldChange}
        error={validationErrors.account_manager}
      />
    </FormGroup>
    <FormGroup>
      <label>Project Manager</label>
      <Field
        component={ReduxSelect}
        name="project_manager"
        options={userOptions}
        onChange={onFieldChange}
        error={validationErrors.project_manager}
      />
    </FormGroup>
    <FormGroup>
      <label>Team Members</label>
      <Field
        component={ReduxAssociations}
        name="team"
        options={userOptions}
        onChange={onFieldChange}
        error={validationErrors.team}
      />
    </FormGroup>
  </FormGroup>
);

TeamFormGroup.propTypes = propTypes;

export default enhance(TeamFormGroup);
