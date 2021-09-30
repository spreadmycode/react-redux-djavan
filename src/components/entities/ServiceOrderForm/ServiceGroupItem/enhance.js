import { compose, onlyUpdateForKeys, withState, withHandlers, withPropsOnChange } from 'recompose';

import { empty, formatMoney } from 'src/helpers';

const idEnhancer = withState('id', 'onSetId');

const handlersEnhancer = withHandlers({
  onEdit: ({ onEdit, id, member }) => () => setTimeout(onEdit, 0, id, member),
  onDelete: ({ onDelete, id, index }) => () => onDelete(id, index),
  onAddServiceInstance: ({ onAddServiceInstance, id }) => data => onAddServiceInstance({
    ...data,
    service_group: id,
  }),
  onAddAdjustment: ({ onAddAdjustment, id }) => data => onAddAdjustment({
    ...data,
    service_group: id,
  }),
});

const propsEnhancer = withPropsOnChange(
  ['serviceGroupsValidationErrors', 'id', 'summaryOfCosts'],
  ({ serviceGroupsValidationErrors, id, summaryOfCosts }) => ({

    validationErrors: serviceGroupsValidationErrors[id] || empty,
    displayTotal: id && formatMoney(summaryOfCosts.costsByGroupId[id].total),
    displaySubtotal: id && formatMoney(summaryOfCosts.costsByGroupId[id].subtotal),
  }));

export default compose(
  idEnhancer,
  handlersEnhancer,
  propsEnhancer,
  onlyUpdateForKeys([
    'validationErrors',
    'serviceInstanceValidationErrors',
    'adjustmentValidationErrors',
    'serviceOptions',
    'displayTotal',
    'displaySubtotal',
  ]),
);
