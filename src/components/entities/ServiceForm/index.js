import { Col, Row, FormGroup, Form, Label } from 'reactstrap';
import { Field } from 'redux-form';
import { object, func, bool } from 'prop-types';

import { ReduxInput, ReduxSelect, ReduxPriorityVote, ReduxRichText, ReduxAsset } from 'src/components';
import { selectOptionsType } from 'src/prop-types';

import enhance from './enhance';

const propTypes = {
  isNew: bool,
  assetsData: object,
  validationErrors: object,
  engagementTypeOptions: selectOptionsType.isRequired,
  onFieldChange: func.isRequired,
  onUploadAsset: func.isRequired,
};

const ServiceForm = ({
  validationErrors,
  isNew,
  engagementTypeOptions,
  assetsData,

  onFieldChange,
  onUploadAsset,
}) => (
  <Form>
    <Row>
      <Col md="6">
        <FormGroup tag="fieldset">
          <FormGroup>
            <Row>
              <Col md="2" sm="3">
                <Field
                  disabled={isNew}
                  component={ReduxPriorityVote}
                  onChange={onFieldChange}
                  name="default_sort_priority"
                />
              </Col>
              <Col md="10" sm="2">
                <label>Name</label>
                <Field
                  component={ReduxInput}
                  type="text"
                  name="name"
                  placeholder="Service Name"
                  onBlur={onFieldChange}
                  error={validationErrors.name}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <label>Default Engagment Type</label>
            <Field
              component={ReduxSelect}
              name="engagement_type"
              options={engagementTypeOptions}
              placeholder="Default Engagment Type"
              onChange={onFieldChange}
              error={validationErrors.engagement_type}
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Field
              component={ReduxRichText}
              type="textarea"
              name="description"
              placeholder="Description"
              onBlur={onFieldChange}
              error={validationErrors.description}
            />
          </FormGroup>
          <FormGroup>
            <Label>Scope text</Label>
            <Field
              component={ReduxRichText}
              type="textarea"
              name="engagement_type_description"
              placeholder="Scope text"
              onBlur={onFieldChange}
              error={validationErrors.engagement_type_description}
            />
          </FormGroup>
          <FormGroup>
            <Label>Remediation text</Label>
            <Field
              component={ReduxRichText}
              type="textarea"
              name="remediation_text"
              placeholder="Recomendation text"
              onBlur={onFieldChange}
              error={validationErrors.remediation_text}
            />
          </FormGroup>
        </FormGroup>
      </Col>
      <Col md="6">
        <FormGroup>
          <FormGroup>
            <label>Featured Image</label>
            <Field
              component={ReduxAsset}
              name="feature_image"
              type="image"
              assetsData={assetsData}
              onChange={onFieldChange}
              onUpload={onUploadAsset}
              error={validationErrors.feature_image}
            />
          </FormGroup>
          <FormGroup>
            <Label>Service Body</Label>
            <Field
              component={ReduxRichText}
              disabled={isNew}
              name="html_body"
              onChange={onFieldChange}
              error={validationErrors.html_body}
            />
          </FormGroup>
        </FormGroup>
      </Col>
    </Row>
  </Form>
);

ServiceForm.propTypes = propTypes;

export default enhance(ServiceForm);
