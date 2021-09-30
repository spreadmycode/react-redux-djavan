import { Col, Row, FormGroup, Form } from 'reactstrap';
import { Field } from 'redux-form';
import { object, func, string, arrayOf } from 'prop-types';

import { ReduxSelect, ReduxAssociations } from 'src/components';
import { selectOptionsType, clientType } from 'src/prop-types';

import ClientFormGroup from './ClientFormGroup';
import FocalFormGroup from './FocalFormGroup';
import ManagementFormGroup from './ManagementFormGroup';
import DepartmentClients from './DepartmentClients';

import enhance from './enhance';

const propTypes = {
  parentsOptions: selectOptionsType.isRequired,
  issuersOptions: selectOptionsType.isRequired,
  industriesOptions: selectOptionsType.isRequired,
  projectManagerOptions: selectOptionsType.isRequired,
  validationErrors: object,
  departmentClients: arrayOf(clientType),
  created: string,

  onFieldChange: func.isRequired,
  onRedirect: func,
};

const ClientForm = ({
  parentsOptions,
  issuersOptions,
  industriesOptions,
  projectManagerOptions,
  validationErrors,
  departmentClients,
  created,

  onFieldChange,
  onRedirect,
}) => (
  <Form>
    <Row>
      <Col md="6">
        <ClientFormGroup
          validationErrors={validationErrors}
          onFieldChange={onFieldChange}
        />
        <FocalFormGroup
          validationErrors={validationErrors}
          onFieldChange={onFieldChange}
        />
      </Col>

      <Col md="6">
        <ManagementFormGroup {...{
          parentsOptions,
          issuersOptions,
          projectManagerOptions,
          validationErrors,
          created,

          onFieldChange,
        }}
        />

        <FormGroup tag="fieldset">
          <legend>Parent Client</legend>
          <Field
            component={ReduxSelect}
            name="umbrella"
            options={parentsOptions}
            placeholder="Parent"
            onChange={onFieldChange}
            error={validationErrors.umbrella}
          />
        </FormGroup>

        <FormGroup tag="fieldset">
          <legend>Associated Industries</legend>
          <Field
            component={ReduxAssociations}
            name="industries"
            options={industriesOptions}
            onChange={onFieldChange}
            error={validationErrors.industries}
          />
        </FormGroup>

        <Base
          component={DepartmentClients}
          exists={departmentClients && departmentClients.length}
          departmentClients={departmentClients}
          onRedirect={onRedirect}
        />
      </Col>
    </Row>
  </Form>
);

ClientForm.propTypes = propTypes;

export default enhance(ClientForm);
