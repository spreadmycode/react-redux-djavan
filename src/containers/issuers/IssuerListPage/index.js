import { arrayOf, func, shape, string } from 'prop-types';
import { Link } from 'react-router';

import { Page, PageContent, PageHeader, Button } from 'src/components';
import { issuerType } from 'src/prop-types';

import IssuerList from './IssuerList';
import IssuerFilters from './IssuerFilters';
import enhance from './enhance';

const propTypes = {
  issuers: arrayOf(issuerType).isRequired,
  filters: shape({
    contains: string,
  }).isRequired,
  onFiltersChange: func.isRequired,
};

const breadcrumbs = [{ label: 'Issuers' }];

const IssuerListPage = ({
  issuers,
  filters,

  onFiltersChange,
}) => (
  <Page title="Issuers">
    <PageHeader breadcrumbs={breadcrumbs}>
      <Link to="/issuers/new">
        <Button color="primary">Create new issuer</Button>
      </Link>
    </PageHeader>
    <PageContent>
      <IssuerFilters onFiltersChange={onFiltersChange} initialValues={filters} />
      <Base exists={!issuers.length}>No results are found</Base>
      <IssuerList
        issuers={issuers}
      />
    </PageContent>
  </Page>
);

IssuerListPage.propTypes = propTypes;

export default enhance(IssuerListPage);
