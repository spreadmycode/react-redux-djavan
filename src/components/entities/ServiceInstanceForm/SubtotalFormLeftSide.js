import { Row, Col, FormGroup } from 'reactstrap';
import { Field, FieldArray } from 'redux-form';
import { object, func } from 'prop-types';
import { pure } from 'recompose';

import { ReduxAdjustmentsArray, ReduxSelect, ReduxDatePicker, ReduxRichText, ReduxRichTextList } from 'src/components';
import { selectOptionsType } from 'src/prop-types';

import SubtotalFormGroup from './SubtotalFormGroup';

const propTypes = {
  serviceOptions: selectOptionsType.isRequired,
  validationErrors: object.isRequired,
  adjustmentValidationErrors: object.isRequired,

  onFieldChange: func.isRequired,
  onEditAdjustment: func.isRequired,
  onAddAdjustment: func.isRequired,
  onDeleteAdjustment: func.isRequired,
};

const enhance = pure;

const SubtotalFormLeftSide = ({
  serviceOptions,
  validationErrors,
  adjustmentValidationErrors,

  onFieldChange,

  onEditAdjustment,
  onAddAdjustment,
  onDeleteAdjustment,
}) => (
  <div>
    <FormGroup>
      <label>Service</label>
      <Field
        component={ReduxSelect}
        name="service"
        options={serviceOptions}
        onChange={onFieldChange}
        error={validationErrors.service}
      />
    </FormGroup>
    <FormGroup>
      <Row>
        <Col md="6">
          <label>From</label>
          <Field
            component={ReduxDatePicker}
            name="start_date"
            placeholder="Start Date"
            onChange={onFieldChange}
            error={validationErrors.start_date}
            formatAsDate
          />
        </Col>
        <Col md="6">
          <label>To</label>
          <Field
            component={ReduxDatePicker}
            name="end_date"
            placeholder="End Date"
            onChange={onFieldChange}
            error={validationErrors.end_date}
            formatAsDate
          />
        </Col>
      </Row>
    </FormGroup>

    <FormGroup>
      <label>Information provided</label>

      <Field
        component={ReduxRichText}
        name="information_provided"
        onBlur={onFieldChange}
        error={validationErrors.information_provided}
        formatAsDate
      />
    </FormGroup>

    <FormGroup>
      <label>Scope Summary</label>

      <Field
        component={ReduxRichText}
        name="scope_summary"
        onBlur={onFieldChange}
        error={validationErrors.scope_summary}
        formatAsDate
      />
    </FormGroup>

    <FormGroup>
      <label>Scope</label>
      <Field
        component={ReduxRichTextList}
        name="scope_text"
        onChange={onFieldChange}
        error={validationErrors.scope_text}
      />
    </FormGroup>
    <SubtotalFormGroup
      validationErrors={validationErrors}
      onFieldChange={onFieldChange}
    />

    <FormGroup tag="fieldset">
      <legend>Adjusments</legend>
      <FieldArray
        name="adjustments"
        component={ReduxAdjustmentsArray}
        adjustmentValidationErrors={adjustmentValidationErrors}

        onEdit={onEditAdjustment}
        onAdd={onAddAdjustment}
        onDelete={onDeleteAdjustment}
      />
    </FormGroup>
  </div>
);

SubtotalFormLeftSide.propTypes = propTypes;

export default enhance(SubtotalFormLeftSide);
