import { FormGroup } from 'reactstrap';
import { compose, pure, withHandlers } from 'recompose';
import { object, func } from 'prop-types';

import { Button } from 'src/components';
import { selectOptionsType } from 'src/prop-types';

import ServiceGroupItem from '../ServiceGroupItem';
import css from './style.css';

const propTypes = {
  fields: object.isRequired,
  summaryOfCosts: object.isRequired,
  serviceOptions: selectOptionsType.isRequired,
  frequencyOptions: selectOptionsType,
  serviceGroupsValidationErrors: object.isRequired,
  serviceInstanceValidationErrors: object.isRequired,
  adjustmentValidationErrors: object.isRequired,

  onAdd: func.isRequired,
  onEdit: func.isRequired,
  onDelete: func.isRequired,

  onEditServiceInstance: func.isRequired,
  onAddServiceInstance: func.isRequired,
  onDeleteServiceInstance: func.isRequired,

  onEditAdjustment: func.isRequired,
  onAddAdjustment: func.isRequired,
  onDeleteAdjustment: func.isRequired,
};

const handlersEnhancer = withHandlers({
  onDelete: ({ onDelete }) => id => onDelete(id),
});

const enhance = compose(
  handlersEnhancer,
  pure,
);

const ServiceGroupArray = ({
  fields,
  summaryOfCosts,
  serviceOptions,
  frequencyOptions,
  serviceGroupsValidationErrors,
  serviceInstanceValidationErrors,
  adjustmentValidationErrors,

  onAdd,
  onEdit,
  onDelete,

  onEditServiceInstance,
  onAddServiceInstance,
  onDeleteServiceInstance,

  onEditAdjustment,
  onAddAdjustment,
  onDeleteAdjustment,
}) => (
  <FormGroup tag="fieldset">
    <legend>Recurring Service Groups</legend>
    <Base exists={fields.length} className={css.items}>
      {fields.map((member, index) => (
        <ServiceGroupItem
          className={css.item}
          member={member}
          index={index}
          key={member}
          extended
          {...{
            summaryOfCosts,
            serviceOptions,
            frequencyOptions,
            serviceGroupsValidationErrors,
            serviceInstanceValidationErrors,
            adjustmentValidationErrors,

            onDelete,
            onEdit,

            onEditServiceInstance,
            onAddServiceInstance,
            onDeleteServiceInstance,

            onEditAdjustment,
            onAddAdjustment,
            onDeleteAdjustment,
          }}
        />
    ))}
    </Base>
    <Button color="primary" onClick={onAdd}>Add Service Group</Button>
  </FormGroup>
);

ServiceGroupArray.propTypes = propTypes;

export default enhance(ServiceGroupArray);
