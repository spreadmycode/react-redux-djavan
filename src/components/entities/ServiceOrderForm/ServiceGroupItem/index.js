import { Field, FieldArray } from 'redux-form';
import { FormGroup, Col, Row } from 'reactstrap';
import { string, bool, object, func } from 'prop-types';

import { ReduxAdjustmentsArray, ReduxInput, ReduxHidden, Button, ReduxRichTextList, ReduxPriorityVote, ReduxOutputText, ReduxSelect } from 'src/components';
import { selectOptionsType } from 'src/prop-types';

import ServiceInstanceArray from './ServiceInstanceArray';
import enhance from './enhance';

const propTypes = {
  member: string.isRequired,
  extended: bool,
  displayTotal: string,
  displaySubtotal: string,
  validationErrors: object.isRequired,
  serviceInstanceValidationErrors: object.isRequired,
  adjustmentValidationErrors: object.isRequired,
  className: string,
  serviceOptions: selectOptionsType.isRequired,
  frequencyOptions: selectOptionsType,

  onSetId: func.isRequired,

  onEdit: func.isRequired,
  onDelete: func.isRequired,

  onEditServiceInstance: func.isRequired,
  onAddServiceInstance: func.isRequired,
  onDeleteServiceInstance: func.isRequired,

  onEditAdjustment: func.isRequired,
  onAddAdjustment: func.isRequired,
  onDeleteAdjustment: func.isRequired,
};

const ServiceGroupItem = ({
  member,
  extended,
  displayTotal,
  displaySubtotal,
  validationErrors,
  serviceInstanceValidationErrors,
  adjustmentValidationErrors,
  className,
  serviceOptions,
  frequencyOptions,

  onSetId,

  onEdit,
  onDelete,

  onEditServiceInstance,
  onAddServiceInstance,
  onDeleteServiceInstance,

  onEditAdjustment,
  onAddAdjustment,
  onDeleteAdjustment,
}) => (
  <FormGroup className={className}>
    <Field name={`${member}.id`} component={ReduxHidden} onFill={onSetId} />
    <Row>
      <Col md="1">
        <Base exists={extended}>
          <Field
            component={ReduxPriorityVote}
            name={`${member}.sort_priority`}
            onChange={onEdit}
            error={validationErrors.sort_priority}
          />
        </Base>
      </Col>
      <Col md="7">
        <Base exists={extended} component={Row}>
          <Col md="12">
            <h5>
            Recurring Service Group
            #<Field name={`${member}.id`} component={ReduxOutputText} />
            </h5>
          </Col>
          <Col md="6" lg="6" xl="3">
            <FormGroup>
              <label>Frequency</label>
              <Field name={`${member}.frequency`} component={ReduxSelect} options={frequencyOptions} />
            </FormGroup>
          </Col>
          <Col md="6" lg="6" xl="3">
            <FormGroup>
              <label>Iterations</label>
              <Field
                component={ReduxInput}
                name={`${member}.iterations`}
                type="number"
                addonPost="times"
                error={validationErrors.iterations}
                parse={parseInt}

                onBlur={onEdit}
              />
            </FormGroup>
          </Col>
          <Col md="12" lg="12" xl="6">
            <FormGroup>
              <label>Simple Service Range</label>
              <Field
                component={ReduxInput}
                name={`${member}.simple_service_range`}
                type="textarea"
                error={validationErrors.simple_service_range}

                onBlur={onEdit}
              />
            </FormGroup>
          </Col>
        </Base>
      </Col>
      <Col md="4">
        <FormGroup>
          <label>Incentives</label>
          <Field
            component={ReduxRichTextList}
            name={`${member}.incentives`}
            onChange={onEdit}
            error={validationErrors.incentives}
          />
        </FormGroup>
      </Col>
    </Row>

    <FormGroup tag="fieldset">
      <legend>Selected Services</legend>
      <FieldArray
        name={`${member}.service_instances`}
        component={ServiceInstanceArray}
        displaySubtotal={displaySubtotal}
        serviceInstanceValidationErrors={serviceInstanceValidationErrors}
        serviceOptions={serviceOptions}

        onEdit={onEditServiceInstance}
        onAdd={onAddServiceInstance}
        onDelete={onDeleteServiceInstance}
      />
    </FormGroup>

    <FormGroup tag="fieldset">
      <legend>Adjusments</legend>
      <FieldArray
        name={`${member}.adjustments`}
        component={ReduxAdjustmentsArray}
        adjustmentValidationErrors={adjustmentValidationErrors}

        onEdit={onEditAdjustment}
        onAdd={onAddAdjustment}
        onDelete={onDeleteAdjustment}
      />
    </FormGroup>

    <FormGroup>
      <strong>Total: {displayTotal}</strong>
    </FormGroup>

    <Base
      component={Button}
      exists={extended}
      onClick={onDelete}
    >Delete Service Group</Base>
  </FormGroup>
);

ServiceGroupItem.propTypes = propTypes;

export default enhance(ServiceGroupItem);
