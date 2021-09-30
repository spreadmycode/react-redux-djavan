import { Page, PageContent, PageHeader, Button } from 'src/components';
import { Link } from 'react-router';

import { array, object, func, string, shape } from 'prop-types';
import enhance from './enhance';
import ServiceList from './ServiceList';
import ServiceFilters from './ServiceFilters';

const propTypes = {
  services: array.isRequired,
  assetsData: object.isRequired,
  filters: shape({
    contains: string,
  }).isRequired,

  onEdit: func.isRequired,
  onFiltersChange: func.isRequired,
};

const breadcrumbs = [{ label: 'Services' }];

const ServiceListPage = ({
  services,
  assetsData,
  filters,

  onEdit,
  onFiltersChange,
}) => (
  <Page title="Services">
    <PageHeader breadcrumbs={breadcrumbs}>
      <Link to="/services/new">
        <Button color="primary">Create new Service</Button>
      </Link>
    </PageHeader>
    <PageContent>
      <ServiceFilters onFiltersChange={onFiltersChange} initialValues={filters} />
      <Base exists={!services.length}>No results are found</Base>
      <ServiceList
        services={services}
        assetsData={assetsData}
        onEdit={onEdit}
      />
    </PageContent>
  </Page>
);

ServiceListPage.propTypes = propTypes;

export default enhance(ServiceListPage);
