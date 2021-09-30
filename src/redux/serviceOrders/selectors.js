import { createSelector } from 'reselect';

import { applyAdjustments } from 'src/helpers';

import { getServiceGroupsData as getServiceGroupsDataRef } from 'src/redux/serviceGroups/selectors';
import { getServiceInstancesData as getServiceInstancesDataRef } from 'src/redux/serviceInstances/selectors';
import { getAdjustmentsData as getAdjustmentsDataRef } from 'src/redux/adjustments/selectors';

// fixes circular dependency issues
const getServiceGroupsData = (...args) => getServiceGroupsDataRef(...args);
const getServiceInstancesData = (...args) => getServiceInstancesDataRef(...args);
const getAdjustmentsData = (...args) => getAdjustmentsDataRef(...args);

const getServiceOrdersIds = state => state.serviceOrders.ids;
const getCurrentServiceOrderId = state => state.serviceOrders.id;
export const getServiceOrdersData = state => state.serviceOrders.data;

export const getServiceOrders = createSelector(
    [getServiceOrdersIds, getServiceOrdersData],
    (ids, data) => ids.map(id => data[id]),
);

const fillServiceGroup = (serviceGroup, serviceInsancesData, adjustmentsData) => ({
  ...serviceGroup,
  service_instances: serviceGroup.service_instance_ids.map(id => serviceInsancesData[id]),
  adjustments: serviceGroup.adjustments.map(adjustmentId => adjustmentsData[adjustmentId]),
});


// Yeah, looks not good :(
export const getCurrentServiceOrder = createSelector(
  [
    getCurrentServiceOrderId, getServiceOrdersData, getServiceGroupsData,
    getServiceInstancesData, getAdjustmentsData,
  ],
  (id, data, serviceGroupsData, serviceInsancesData, adjustmentsData) => ({
    ...data[id],
    primary_service_group: fillServiceGroup(
      serviceGroupsData[data[id].primary_service_group_id],
      serviceInsancesData,
      adjustmentsData,
    ),
    service_groups: data[id].service_group_ids.map(
        sgId => fillServiceGroup(
          serviceGroupsData[sgId],
          serviceInsancesData,
          adjustmentsData,
        ),
      ),
  }),
);

// Summary of costs


const calculateServiceGroup = (
  serviceGroup,
  serviceInstancesDate,
  adjustmentsData,
) => {
  const costs = {
    instances: [],
    adjustments: [],
    subtotal: 0,
    total: 0,
    serviceGroup,
  };
  serviceGroup.service_instances.forEach((id) => {
    const instance = serviceInstancesDate[id];
    const cost = instance.unit_price * instance.number_of_hours;

    costs.instances.push({ cost, instance });

    costs.subtotal += cost;
  });

  serviceGroup.adjustments.forEach((id) => {
    costs.adjustments.push(adjustmentsData[id]);
  });

  costs.total = applyAdjustments(costs.subtotal, costs.adjustments);

  return costs;
};

export const getSummaryOfCosts = createSelector(
  [
    getCurrentServiceOrderId, getServiceOrdersData, getServiceGroupsData,
    getServiceInstancesData, getAdjustmentsData,
  ],
  (id, data, serviceGroupsData, serviceInsancesData, adjustmentsData) => {
    const serviceOrder = data[id];
    const costsByGroupId = {};
    const primaryServiceGroupCosts = calculateServiceGroup(
      serviceGroupsData[serviceOrder.primary_service_group_id],
      serviceInsancesData,
      adjustmentsData,
    );
    let subtotal = primaryServiceGroupCosts.subtotal;
    let total = primaryServiceGroupCosts.total;

    const serviceGroupsCosts = serviceOrder.service_group_ids.map((serviceGroupId) => {
      const costs = calculateServiceGroup(
        serviceGroupsData[serviceGroupId],
        serviceInsancesData,
        adjustmentsData,
      );
      costsByGroupId[serviceGroupId] = costs;
      subtotal += costs.subtotal;
      total += costs.total;
      return costs;
    });

    costsByGroupId[serviceOrder.primary_service_group_id] = primaryServiceGroupCosts;

    return {
      primaryServiceGroupCosts,
      serviceGroupsCosts,
      costsByGroupId,
      subtotal,
      total,
      serverSideTotal: serviceOrder.total_due,
    };
  },
);
