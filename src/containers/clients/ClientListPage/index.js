import { Link } from 'react-router';
import { arrayOf, shape, string, number, func } from 'prop-types';

import { Page, PageContent, PageHeader, Button, Paginate } from 'src/components';
import { clientType } from 'src/prop-types';

import enhance from './enhance';
import ClientList from './ClientList';
import ClientFilters from './ClientFilters';

const propTypes = {
  clients: arrayOf(clientType),
  filters: shape({
    contains: string,
    per_page: number,
    sort: string,
  }).isRequired,

  page: number.isRequired,
  pageCount: number.isRequired,

  onFiltersChange: func.isRequired,
  onPageChange: func.isRequired,
};

const breadcrumbs = [{ label: 'Clients' }];

const ClientListPage = ({
  clients,
  filters,

  page,
  pageCount,

  onFiltersChange,
  onPageChange,
}) => (
  <Page title="Clients">
    <PageHeader breadcrumbs={breadcrumbs}>
      <Link to="/clients/new">
        <Button color="primary">Create new client</Button>
      </Link>
    </PageHeader>
    <PageContent>
      <ClientFilters onFiltersChange={onFiltersChange} initialValues={filters} />
      <Base exists={!clients.length}>No results are found</Base>
      <ClientList clients={clients} />
      <Paginate
        pageCount={pageCount}
        page={page}
        onChange={onPageChange}
      />
    </PageContent>
  </Page>
);

ClientListPage.propTypes = propTypes;

export default enhance(ClientListPage);
