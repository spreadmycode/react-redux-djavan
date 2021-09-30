import { Button } from 'reactstrap';
import { object, func, arrayOf, objectOf } from 'prop-types';
import { Link } from 'react-router';

import {
  ServiceOrderForm,
  Page,
  PageContent,
  PageHeader,
  PageFooter,
} from 'src/components';
import { breadcrumbsType, clientType, userType, industryType, focalProfileType, serviceOrderType, serviceType } from 'src/prop-types';

import SummaryOfCosts from './SummaryOfCosts';
import enhance from './enhance';

const propTypes = {
  breadcrumbs: breadcrumbsType.isRequired,
  choices: object.isRequired,
  serviceGroupChoices: object.isRequired,
  clients: arrayOf(clientType).isRequired,
  users: arrayOf(userType).isRequired,
  industries: arrayOf(industryType).isRequired,
  focalProfiles: arrayOf(focalProfileType).isRequired,
  services: arrayOf(serviceType).isRequired,
  usersData: objectOf(userType).isRequired,
  serviceOrder: serviceOrderType.isRequired,
  summaryOfCosts: object.isRequired,
  validationErrors: object.isRequired,
  serviceGroupsValidationErrors: object.isRequired,
  serviceInstanceValidationErrors: object.isRequired,
  adjustmentValidationErrors: object.isRequired,

  onDelete: func.isRequired,
  onFieldChange: func.isRequired,

  onEditServiceGroup: func.isRequired,
  onAddServiceGroup: func.isRequired,
  onDeleteServiceGroup: func.isRequired,

  onEditServiceInstance: func.isRequired,
  onAddServiceInstance: func.isRequired,
  onDeleteServiceInstance: func.isRequired,

  onEditAdjustment: func.isRequired,
  onAddAdjustment: func.isRequired,
  onDeleteAdjustment: func.isRequired,
};

const ServiceOrderEditPage = ({
  breadcrumbs,
  choices,
  serviceGroupChoices,
  clients,
  users,
  industries,
  focalProfiles,
  services,
  usersData,
  serviceOrder,
  summaryOfCosts,
  validationErrors,
  serviceGroupsValidationErrors,
  serviceInstanceValidationErrors,
  adjustmentValidationErrors,

  onDelete,
  onFieldChange,

  onEditServiceGroup,
  onAddServiceGroup,
  onDeleteServiceGroup,

  onEditServiceInstance,
  onAddServiceInstance,
  onDeleteServiceInstance,

  onEditAdjustment,
  onAddAdjustment,
  onDeleteAdjustment,
}) => (
  <Page title={`Editing ${serviceOrder.composite_id}`}>
    <PageHeader breadcrumbs={breadcrumbs} />
    <PageContent>
      <ServiceOrderForm {...{
        created: serviceOrder.created,
        id: serviceOrder.id,
        validationErrors,
        breadcrumbs,
        clients,
        users,
        industries,
        focalProfiles,
        services,
        usersData,
        choices,
        serviceGroupChoices,
        summaryOfCosts,
        serviceGroupsValidationErrors,
        serviceInstanceValidationErrors,
        adjustmentValidationErrors,

        onFieldChange,
        onEditServiceGroup,
        onAddServiceGroup,
        onDeleteServiceGroup,

        onEditServiceInstance,
        onAddServiceInstance,
        onDeleteServiceInstance,

        onEditAdjustment,
        onAddAdjustment,
        onDeleteAdjustment,
      }}
      />

      <SummaryOfCosts
        primaryServiceGroupCosts={summaryOfCosts.primaryServiceGroupCosts}
        serviceGroupsCosts={summaryOfCosts.serviceGroupsCosts}
        subtotal={summaryOfCosts.subtotal}
        total={summaryOfCosts.total}
        serverSideTotal={summaryOfCosts.serverSideTotal}
      />

      <PageFooter>
        <Button tag={Link} to="/service-orders" color="success" className="float-right">Done</Button>
        <Button color="danger" onClick={onDelete}>Delete</Button>
      </PageFooter>
    </PageContent>
  </Page>
);

ServiceOrderEditPage.propTypes = propTypes;

export default enhance(ServiceOrderEditPage);
