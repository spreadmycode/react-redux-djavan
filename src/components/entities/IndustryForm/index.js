import { Col, Row, FormGroup, Form } from 'reactstrap';
import { Field } from 'redux-form';
import { object, func } from 'prop-types';

import { ReduxInput, ReduxRichText } from 'src/components';

import enhance from './enhance';

const propTypes = {
  validationErrors: object.isRequired,

  onFieldChange: func.isRequired,
};

const ClientForm = ({
  validationErrors,

  onFieldChange,
}) => (
  <Form>
    <Row>
      <Col md="6">
        <FormGroup>
          <label>Industry</label>
          <Field
            component={ReduxInput}
            type="text"
            name="name"
            placeholder="Industry"
            onBlur={onFieldChange}
            error={validationErrors.name}
          />
        </FormGroup>
      </Col>
      <Col md="6">
        <FormGroup>
          <label>Description</label>
          <Field
            component={ReduxRichText}
            name="html_body"
            onBlur={onFieldChange}
            error={validationErrors.html_body}
          />
        </FormGroup>
      </Col>
    </Row>
  </Form>
);

ClientForm.propTypes = propTypes;

export default enhance(ClientForm);
