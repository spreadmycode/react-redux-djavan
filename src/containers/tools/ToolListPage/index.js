import { arrayOf, func, shape, string } from 'prop-types';
import { Link } from 'react-router';

import { Page, PageContent, PageHeader, Button } from 'src/components';
import { toolType } from 'src/prop-types';

import ToolList from './ToolList';
import ToolFilters from './ToolFilters';
import enhance from './enhance';

const propTypes = {
  tools: arrayOf(toolType).isRequired,
  filters: shape({
    contains: string,
  }).isRequired,
  onEdit: func.isRequired,
  onFiltersChange: func.isRequired,
};

const breadcrumbs = [{ label: 'Tools' }];

const ToolListPage = ({
  tools,
  filters,

  onEdit,
  onFiltersChange,
}) => (
  <Page title="Tools">
    <PageHeader breadcrumbs={breadcrumbs}>
      <Link to="/tools/new">
        <Button color="primary">Create new tool</Button>
      </Link>
    </PageHeader>
    <PageContent>
      <ToolFilters onFiltersChange={onFiltersChange} initialValues={filters} />
      <Base exists={!tools.length}>No results are found</Base>
      <ToolList
        tools={tools}
        onEdit={onEdit}
      />
    </PageContent>
  </Page>
);

ToolListPage.propTypes = propTypes;

export default enhance(ToolListPage);
