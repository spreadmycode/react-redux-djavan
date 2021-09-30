import { arrayOf, func, shape, string } from 'prop-types';
import { Link } from 'react-router';

import { Page, PageContent, PageHeader, Button } from 'src/components';
import { industryType } from 'src/prop-types';

import IndustryList from './IndustryList';
import IndustryFilters from './IndustryFilters';
import enhance from './enhance';

const propTypes = {
  industries: arrayOf(industryType).isRequired,
  filters: shape({
    contains: string,
  }).isRequired,
  onFiltersChange: func.isRequired,
};

const breadcrumbs = [{ label: 'Industries' }];

const IndustryListPage = ({
  industries,
  filters,

  onFiltersChange,
}) => (
  <Page title="Industries">
    <PageHeader breadcrumbs={breadcrumbs}>
      <Link to="/industries/new">
        <Button color="primary">Create new industry</Button>
      </Link>
    </PageHeader>
    <PageContent>
      <IndustryFilters
        onFiltersChange={onFiltersChange}
        initialValues={filters}
      />
      <Base exists={!industries.length}>No results are found</Base>
      <IndustryList
        industries={industries}
      />
    </PageContent>
  </Page>
);

IndustryListPage.propTypes = propTypes;

export default enhance(IndustryListPage);
