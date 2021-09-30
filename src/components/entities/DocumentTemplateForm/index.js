import { Col, Row, FormGroup, Form } from 'reactstrap';
import { Field } from 'redux-form';
import { object, func, string } from 'prop-types';

import formatTime from 'src/helpers/formatTime';
import { ReduxInput, ReduxCheckbox, ReduxSelect } from 'src/components';
import { selectOptionsType } from 'src/prop-types';

import enhance from './enhance';

const propTypes = {
  created: string,
  modified: string,
  issuerOptions: selectOptionsType.isRequired,
  categoryOptions: selectOptionsType.isRequired,
  validationErrors: object.isRequired,

  onFieldChange: func.isRequired,
};


const DocumentTemplateForm = ({
  created,
  modified,
  issuerOptions,
  categoryOptions,
  validationErrors,

  onFieldChange,
}) => (
  <Form>
    <Row>
      <Col md="6">
      Created: {formatTime(created).full() || '-'}
        <br /><br />
      Modified: {formatTime(modified).full() || '-'}

        <FormGroup>
          <Field
            component={ReduxCheckbox}
            name="is_default"
            label="Use as default"
            onChange={onFieldChange}
            error={validationErrors.is_default}
          />
        </FormGroup>

        <FormGroup>
          <label>Category</label>
          <Field
            component={ReduxSelect}
            name="category"
            options={categoryOptions}
            onChange={onFieldChange}
            error={validationErrors.category}
          />
        </FormGroup>

        <FormGroup>
          <label>Template Body</label>
          <Field
            component={ReduxInput}
            type="textarea"
            name="html_body"
            onBlur={onFieldChange}
            error={validationErrors.html_body}
            rows="100"
          />
        </FormGroup>
      </Col>
      <Col md="6">
        <FormGroup>
          <label>Issuer</label>
          <Field
            component={ReduxSelect}
            name="issuer"
            options={issuerOptions}
            onChange={onFieldChange}
            error={validationErrors.issuer}
          />


        </FormGroup>

        <FormGroup>
          <label>Description</label>
          <Field
            component={ReduxInput}
            type="textarea"
            name="description"
            rows={10}
            placeholder="Description"
            onBlur={onFieldChange}
            error={validationErrors.description}
          />
        </FormGroup>
      </Col>
    </Row>
  </Form>
);

DocumentTemplateForm.propTypes = propTypes;

export default enhance(DocumentTemplateForm);
