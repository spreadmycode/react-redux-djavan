import {
  arrayOf,
  func,
  shape,
  string,
  number,
  object,
} from 'prop-types';
import { Link } from 'react-router';

import {
  Page,
  PageContent,
  PageHeader,
  Button,
  Paginate,
} from 'src/components';
import { serviceOrderType } from 'src/prop-types';

import ServiceOrderList from './ServiceOrderList';
import ServiceOrderFilters from './ServiceOrderFilters';
import enhance from './enhance';

const propTypes = {
  serviceOrders: arrayOf(serviceOrderType).isRequired,
  clientsData: object.isRequired,
  filters: shape({
    contains: string,
  }).isRequired,
  choices: shape({
    payment: object.isRequired,
    status: object.isRequired,
  }).isRequired,
  pageCount: number.isRequired,
  page: number.isRequired,

  onFiltersChange: func.isRequired,
  onPageChange: func.isRequired,
};

const breadcrumbs = [{ label: 'Service Orders' }];

const ServiceOrderListPage = ({
  serviceOrders,
  clientsData,
  filters,
  choices,
  pageCount,
  page,

  onFiltersChange,
  onPageChange,
}) => (
  <Page title="Service Orders">
    <PageHeader breadcrumbs={breadcrumbs}>
      <Link to="/service-orders/new">
        <Button color="primary">Create new Service Order</Button>
      </Link>
    </PageHeader>
    <PageContent>
      <ServiceOrderFilters
        initialValues={filters}
        choices={choices}

        onFiltersChange={onFiltersChange}
      />
      <Base exists={!serviceOrders.length}>No results are found</Base>
      <ServiceOrderList
        clientsData={clientsData}
        serviceOrders={serviceOrders}
        choices={choices}
      />
      <Paginate
        pageCount={pageCount}
        page={page}
        onChange={onPageChange}
      />
    </PageContent>
  </Page>
);

ServiceOrderListPage.propTypes = propTypes;

export default enhance(ServiceOrderListPage);
