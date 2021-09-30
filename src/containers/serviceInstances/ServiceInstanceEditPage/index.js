import { Link } from 'react-router';
import { FormGroup } from 'reactstrap';
import { arrayOf, object, func, objectOf } from 'prop-types';

import { Page, PageHeader, PageFooter, PageContent, Button, ServiceInstanceForm } from 'src/components';
import { formatMoney } from 'src/helpers';
import { breadcrumbsType, serviceType, serviceInstanceType, assetType } from 'src/prop-types';

import enhance from './enhance';

const propTypes = {
  breadcrumbs: breadcrumbsType.isRequired,
  services: arrayOf(serviceType).isRequired,
  assetsData: objectOf(assetType).isRequired,
  validationErrors: object.isRequired,
  adjustmentValidationErrors: object.isRequired,
  serviceInstance: serviceInstanceType.isRequired,
  choices: object.isRequired,

  onDelete: func.isRequired,
  onFieldChange: func.isRequired,

  onEditAdjustment: func.isRequired,
  onAddAdjustment: func.isRequired,
  onDeleteAdjustment: func.isRequired,

  onUploadAsset: func.isRequired,
};

const ServiceInstanceEditPage = ({
  breadcrumbs,
  services,
  assetsData,
  validationErrors,
  adjustmentValidationErrors,
  serviceInstance,
  choices,

  onDelete,
  onFieldChange,

  onEditAdjustment,
  onAddAdjustment,
  onDeleteAdjustment,

  onUploadAsset,
}) => (
  <Page title={`Editing ${serviceInstance.display_name}`}>
    <PageHeader breadcrumbs={breadcrumbs} />
    <PageContent>
      <ServiceInstanceForm
        id={serviceInstance.id}
        parentBreadcrumbs={breadcrumbs}
        {...{
          services,
          assetsData,
          validationErrors,
          adjustmentValidationErrors,
          choices,

          onFieldChange,

          onEditAdjustment,
          onAddAdjustment,
          onDeleteAdjustment,

          onUploadAsset,
        }}
      />
      <FormGroup>
        Total due: <strong>{formatMoney(serviceInstance.total)}</strong>
      </FormGroup>
      <PageFooter>
        <Button color="danger" onClick={onDelete}>Delete</Button>
        <Button
          tag={Link}
          to={`/service-orders/${serviceInstance.service_order.id}`}
          color="success"
          className="float-right"
        >
          Done
        </Button>
      </PageFooter>
    </PageContent>
  </Page>
);

ServiceInstanceEditPage.propTypes = propTypes;

export default enhance(ServiceInstanceEditPage);
