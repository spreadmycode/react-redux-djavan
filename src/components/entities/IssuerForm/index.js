import { Col, Row, FormGroup, Form } from 'reactstrap';
import { Field } from 'redux-form';
import { object, func } from 'prop-types';

import { ReduxInput, ReduxCheckbox } from 'src/components';

import enhance from './enhance';

const propTypes = {
  validationErrors: object.isRequired,

  onFieldChange: func.isRequired,
};

const IssuerForm = ({
  validationErrors,

  onFieldChange,
}) => (
  <Form>
    <Row>
      <Col md="12">
        <FormGroup>
          <label>Issuer Name</label>
          <Field
            component={ReduxInput}
            type="text"
            name="name"
            placeholder="Issuer Name"
            onBlur={onFieldChange}
            error={validationErrors.name}
          />

          <Field
            component={ReduxCheckbox}
            name="is_default"
            label="Use as site default"
            onChange={onFieldChange}
            error={validationErrors.is_default}
          />

        </FormGroup>
      </Col>
    </Row>
  </Form>
);

IssuerForm.propTypes = propTypes;

export default enhance(IssuerForm);
