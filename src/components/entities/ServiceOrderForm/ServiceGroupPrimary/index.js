import { FormGroup } from 'reactstrap';
import { object, func } from 'prop-types';

import { selectOptionsType } from 'src/prop-types';

import ServiceGroupItem from '../ServiceGroupItem';
import css from './style.css';

const propTypes = {
  summaryOfCosts: object.isRequired,
  serviceOptions: selectOptionsType.isRequired,
  serviceGroupsValidationErrors: object.isRequired,
  serviceInstanceValidationErrors: object.isRequired,
  adjustmentValidationErrors: object.isRequired,

  onEditServiceGroup: func.isRequired,

  onEditServiceInstance: func.isRequired,
  onAddServiceInstance: func.isRequired,
  onDeleteServiceInstance: func.isRequired,

  onEditAdjustment: func.isRequired,
  onAddAdjustment: func.isRequired,
  onDeleteAdjustment: func.isRequired,
};

const ServiceGroupPrimary = ({
  summaryOfCosts,
  serviceOptions,
  serviceGroupsValidationErrors,
  serviceInstanceValidationErrors,
  adjustmentValidationErrors,

  onEditServiceGroup,

  onEditServiceInstance,
  onAddServiceInstance,
  onDeleteServiceInstance,

  onEditAdjustment,
  onAddAdjustment,
  onDeleteAdjustment,
}) => (
  <FormGroup tag="fieldset">

    <legend>Primary Service Group</legend>
    <div className={css.container}>
      <ServiceGroupItem
        member="primary_service_group"
        {...{
          summaryOfCosts,
          serviceOptions,
          serviceGroupsValidationErrors,
          serviceInstanceValidationErrors,
          adjustmentValidationErrors,

          onEdit: onEditServiceGroup,

          onEditServiceInstance,
          onAddServiceInstance,
          onDeleteServiceInstance,

          onEditAdjustment,
          onAddAdjustment,
          onDeleteAdjustment,
        }}

      />
    </div>
  </FormGroup>
);

ServiceGroupPrimary.propTypes = propTypes;

export default ServiceGroupPrimary;
