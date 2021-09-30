import { Col, Row, FormGroup, Form } from 'reactstrap';
import { Field } from 'redux-form';
import { object, func, bool } from 'prop-types';

import {
  ReduxInput,
  ReduxPriorityVote,
  ReduxAssociations,
  ReduxRichText,
} from 'src/components';
import { selectOptionsType } from 'src/prop-types';

import enhance from './enhance';

const propTypes = {
  validationErrors: object.isRequired,
  findingsOptions: selectOptionsType.isRequired,
  servicesOptions: selectOptionsType.isRequired,
  isNew: bool,

  onFieldChange: func.isRequired,
};

const ClientForm = ({
  validationErrors,
  findingsOptions,
  servicesOptions,
  isNew,

  onFieldChange,
}) => (
  <Form>
    <Row>
      <Col md="6">
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
            <Col md="10" sm="9">

              <label>Tool Name</label>
              <Field
                component={ReduxInput}
                name="name"
                placeholder="Tool Name"
                onBlur={onFieldChange}
                error={validationErrors.name}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <label>HTML Body</label>
          <Field
            component={ReduxRichText}
            name="html_body"
            onBlur={onFieldChange}
            error={validationErrors.html_body}
          />
        </FormGroup>
      </Col>
      <Col md="6">
        <FormGroup>
          <label>Associated findings</label>
          <Field
            component={ReduxAssociations}
            name="associated_findings"
            options={findingsOptions}
            onChange={onFieldChange}
            error={validationErrors.associated_findings}
          />
        </FormGroup>
        <FormGroup>
          <label>Associated services</label>
          <Field
            component={ReduxAssociations}
            name="services"
            options={servicesOptions}
            onChange={onFieldChange}
            error={validationErrors.services}
          />
        </FormGroup>
      </Col>
    </Row>
  </Form>
);

ClientForm.propTypes = propTypes;

export default enhance(ClientForm);
