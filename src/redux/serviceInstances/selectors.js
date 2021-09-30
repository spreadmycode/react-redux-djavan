import { createSelector } from 'reselect';

import { applyAdjustments } from 'src/helpers';

import { getServiceGroupsData } from 'src/redux/serviceGroups/selectors';
import { getServiceOrdersData } from 'src/redux/serviceOrders/selectors';
import { getAdjustmentsData } from 'src/redux/adjustments/selectors';

export const getServiceInstancesData = state => state.serviceInstances.data;
export const getSpecifiedServiceInstance =
  (state, id) => state.serviceInstances.data[id];
const getCurrentServiceInstanceId = state => state.serviceInstances.id;

export const getCurrentServiceInstance = createSelector(
  [
    getCurrentServiceInstanceId, getServiceInstancesData,
    getServiceGroupsData, getServiceOrdersData, getAdjustmentsData,
  ],
    (id, data, serviceGroupsData, serviceOrdersData, adjustmentsData) => {
      const serviceInstance = data[id];
      const service_group = serviceGroupsData[serviceInstance.service_group];
      const { service_order_id, primary_service_order_id } = service_group;
      const service_order = serviceOrdersData[service_order_id || primary_service_order_id];
      const adjustments = serviceInstance.adjustments.map(
        adjustmentId => adjustmentsData[adjustmentId],
      );

      return {
        ...serviceInstance,
        service_group,
        service_order,
        adjustments,
        total: applyAdjustments(
          serviceInstance.number_of_hours * serviceInstance.unit_price,
          adjustments,
        ),
      };
    },
);
