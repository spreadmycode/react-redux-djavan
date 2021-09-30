import { pure } from 'recompose';
import { FormGroup } from 'reactstrap';
import { Field } from 'redux-form';
import { object, func } from 'prop-types';

import { breadcrumbsType } from 'src/prop-types';

import ReduxResetableRichText from './ReduxResetableRichText';

const propTypes = {
  breadcrumbs: breadcrumbsType.isRequired,
  validationErrors: object.isRequired,

  onFieldChange: func.isRequired,
};

const enhance = pure;

const TextSectionsFormGroup = ({
  breadcrumbs,
  validationErrors,

  onFieldChange,
}) => (
  <FormGroup tag="fieldset">
    <legend>Text Sections</legend>
    <FormGroup>
      <Field
        component={ReduxResetableRichText}
        name="strategic_considerations"
        onChange={onFieldChange}
        parentBreadcrumbs={breadcrumbs}
        breadcrumbLabel="Strategic Considerations"
        error={validationErrors.strategic_considerations}
        editButtonLabel="Edit Strategic Considerations"
        format={null}
      />
    </FormGroup>
    <FormGroup>
      <Field
        component={ReduxResetableRichText}
        name="scope_intro"
        onChange={onFieldChange}
        parentBreadcrumbs={breadcrumbs}
        breadcrumbLabel="Scope Intro"
        error={validationErrors.scope_intro}
        editButtonLabel="Edit Scope Intro"
        format={null}
      />
    </FormGroup>
    <FormGroup>
      <Field
        component={ReduxResetableRichText}
        name="remediation_text"
        onChange={onFieldChange}
        parentBreadcrumbs={breadcrumbs}
        breadcrumbLabel="Remediation Text"
        error={validationErrors.remediation_text}
        editButtonLabel="Edit Remediation Text"
        format={null}
      />
    </FormGroup>
    <FormGroup>
      <Field
        component={ReduxResetableRichText}
        name="scope_exclusion"
        onChange={onFieldChange}
        parentBreadcrumbs={breadcrumbs}
        breadcrumbLabel="Scope Exclusion"
        error={validationErrors.scope_exclusion}
        editButtonLabel="Edit Scope Exclusion"
        format={null}
      />
    </FormGroup>
    <FormGroup>
      <Field
        component={ReduxResetableRichText}
        name="rules_of_engagement"
        onChange={onFieldChange}
        parentBreadcrumbs={breadcrumbs}
        breadcrumbLabel="Rules of Engagement"
        error={validationErrors.rules_of_engagement}
        editButtonLabel="Rules of Engagement"
        format={null}
      />
    </FormGroup>
  </FormGroup>
);

TextSectionsFormGroup.propTypes = propTypes;

export default enhance(TextSectionsFormGroup);
