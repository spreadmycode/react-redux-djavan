import { Row, Col, FormGroup } from 'reactstrap';
import { Field } from 'redux-form';
import { string, bool, number, func, object } from 'prop-types';

import {
  Input,
  Select,
  PriorityVote,
  Button,
  FieldError,
  ReduxHidden,
} from 'src/components';

import css from './style.css';

import enhance from './enhance';

const propTypes = {
  member: string.isRequired,
  isEditing: bool.isRequired,

  sort_priority: number,
  value: number,
  modifier: string,
  label: string,
  description: string,
  validationErrors: object.isRequired,

  onSetId: func.isRequired,
  onSetSortPriority: func.isRequired,
  onSetValue: func.isRequired,
  onSetModifier: func.isRequired,
  onSetLabel: func.isRequired,
  onSetDescription: func.isRequired,

  onEdit: func.isRequired,
  onAdd: func.isRequired,
  onCancel: func.isRequired,
};

const modifierOptions = [{
  value: '+',
  label: '+/-',
}, {
  value: '%',
  label: '%',
}];

const AdjustmentFields = ({
  member,
  isEditing,

  sort_priority,
  value,
  modifier,
  label,
  description,
  validationErrors,

  onSetId,
  onSetSortPriority,
  onSetValue,
  onSetModifier,
  onSetLabel,
  onSetDescription,

  onEdit,
  onAdd,
  onCancel,
}) => (
  <Row className={css.wrapper}>
    {
      isEditing ? (
        <span>
          <Field component={ReduxHidden} name={`${member}.id`} onFill={onSetId} />
          <Field component={ReduxHidden} name={`${member}.value`} onFill={onSetValue} />
          <Field component={ReduxHidden} name={`${member}.sort_priority`} onFill={onSetSortPriority} />
          <Field component={ReduxHidden} name={`${member}.modifier`} onFill={onSetModifier} />
          <Field component={ReduxHidden} name={`${member}.label`} onFill={onSetLabel} />
          <Field component={ReduxHidden} name={`${member}.description`} onFill={onSetDescription} />
        </span>
      ) :
      null
    }
    <Col lg="1" md="2" sm="1">
      <PriorityVote
        onChange={onSetSortPriority}
        value={sort_priority}
        disabled={sort_priority === null}
      />
    </Col>
    <Col lg="11" md="10" sm="11">
      <Row>
        <Col lg="3" md="6" sm="3">
          <FormGroup>
            <label>Value</label>
            <Input
              value={value}
              onChange={onSetValue}
              passValue
            />
            <FieldError error={validationErrors.value} />
          </FormGroup>
        </Col>
        <Col lg="3" md="6" sm="3">
          <FormGroup>
            <label>Modifier</label>

            <Select
              value={modifier}
              onChange={onSetModifier}
              options={modifierOptions}
              searchable={false}
              clearable={false}
            />
            <FieldError error={validationErrors.modifier} />
          </FormGroup>
        </Col>
        <Col lg="6" md="12" sm="6">
          <FormGroup>
            <label>Label</label>
            <Input value={label} onChange={onSetLabel} passValue />
            <FieldError error={validationErrors.label} />
          </FormGroup>
        </Col>
        <Col md="12" lg="12" sm="12">
          <FormGroup>
            <label>Description</label>

            <Input value={description} onChange={onSetDescription} passValue />
            <FieldError error={validationErrors.description} />
          </FormGroup>
        </Col>
      </Row>
    </Col>
    <Col lg="12" md="12" sm="12">
      <Base exists={!isEditing} component={Button} onClick={onAdd}>Add</Base>
      <Base exists={isEditing} component={Button} onClick={onEdit}>Save</Base>{' '}
      <Base exists={isEditing} component={Button} onClick={onCancel}>Cancel</Base>
    </Col>
  </Row>
);

AdjustmentFields.propTypes = propTypes;

export default enhance(AdjustmentFields);
