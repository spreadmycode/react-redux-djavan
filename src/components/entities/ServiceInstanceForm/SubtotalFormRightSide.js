import { FormGroup } from 'reactstrap';
import { Field } from 'redux-form';
import { object, func, objectOf } from 'prop-types';
import { pure } from 'recompose';

import { ReduxCheckbox, ReduxDirtiable } from 'src/components';
import { selectOptionsType, breadcrumbsType, assetType } from 'src/prop-types';

const propTypes = {
  engagementTypeOptions: selectOptionsType.isRequired,
  parentBreadcrumbs: breadcrumbsType.isRequired,
  assetsData: objectOf(assetType).isRequired,
  validationErrors: object.isRequired,

  onFieldChange: func.isRequired,

  onUploadAsset: func.isRequired,
};

const enhance = pure;

const SubtotalFormRightSide = ({
  parentBreadcrumbs,
  engagementTypeOptions,
  assetsData,
  validationErrors,

  onFieldChange,

  onUploadAsset,
}) => (
  <div>
    <FormGroup>
      <label>Name</label>
      <Field
        component={ReduxDirtiable}
        dirtiableType="input"
        name="name"
        onChange={onFieldChange}
        error={validationErrors.name}
        format={null}
      />
    </FormGroup>
    <FormGroup>
      <label>Feature Image</label>
      <Field
        component={ReduxDirtiable}
        dirtiableType="asset"
        name="feature_image"
        type="image"
        assetsData={assetsData}
        onChange={onFieldChange}
        onUpload={onUploadAsset}
        error={validationErrors.feature_image}
        format={null}
      />
    </FormGroup>
    <FormGroup>
      <label>Engagement Type</label>
      <Field
        component={ReduxDirtiable}
        dirtiableType="select"
        name="engagement_type"
        options={engagementTypeOptions}
        onChange={onFieldChange}
        error={validationErrors.engagement_type}
        format={null}
      />
    </FormGroup>
    <FormGroup>
      <label>Engagement Type Description</label>
      <Field
        component={ReduxDirtiable}
        dirtiableType="richText"
        name="engagement_type_description"
        onChange={onFieldChange}
        error={validationErrors.engagement_type_description}
        format={null}
      />
    </FormGroup>
    <FormGroup>
      <Field
        component={ReduxCheckbox}
        name="remediation_ordered"
        onChange={onFieldChange}
        label="Remediation Included"
      />
    </FormGroup>
    <FormGroup>
      <label>Remediation Text</label>
      <Field
        component={ReduxDirtiable}
        dirtiableType="richText"
        name="remediation_text"
        onChange={onFieldChange}
        error={validationErrors.remediation_text}
        format={null}
      />
    </FormGroup>
    <FormGroup>
      <label>Description</label>
      <Field
        component={ReduxDirtiable}
        dirtiableType="richText"
        name="description"
        onChange={onFieldChange}
        error={validationErrors.description}
        format={null}
      />
    </FormGroup>
    <FormGroup>
      <Field
        component={ReduxDirtiable}
        dirtiableType="fullPageRichText"
        name="html_body"
        onChange={onFieldChange}
        error={validationErrors.html_body}

        parentBreadcrumbs={parentBreadcrumbs}
        breadcrumbLabel="html_body"
        editButtonLabel="Edit html_body"

        format={null}
      />
    </FormGroup>
  </div>
);

SubtotalFormRightSide.propTypes = propTypes;

export default enhance(SubtotalFormRightSide);
