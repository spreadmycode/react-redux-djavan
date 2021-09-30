import { arrayOf, func, shape, string, object } from 'prop-types';
import { Link } from 'react-router';

import { Page, PageContent, PageHeader, Button } from 'src/components';
import { documentTemplateType, issuerType } from 'src/prop-types';

import DocumentTemplateList from './DocumentTemplateList';
import DocumentTemplateFilters from './DocumentTemplateFilters';
import enhance from './enhance';

const propTypes = {
  documentTemplates: arrayOf(documentTemplateType).isRequired,
  choices: shape({
    category: object.isRequired,
  }).isRequired,
  filters: shape({
    contains: string,
  }).isRequired,
  issuers: arrayOf(issuerType),

  onFiltersChange: func.isRequired,
};

const breadcrumbs = [{ label: 'Document Templates' }];

const DocumentTemplateListPage = ({
  documentTemplates,
  choices,
  filters,
  issuers,

  onFiltersChange,
}) => (
  <Page title="Document Templates">
    <PageHeader breadcrumbs={breadcrumbs}>
      <Link to="/document-templates/new">
        <Button color="primary">Create new Template</Button>
      </Link>
    </PageHeader>
    <PageContent>
      <DocumentTemplateFilters
        onFiltersChange={onFiltersChange}
        initialValues={filters}
        issuers={issuers}
        choices={choices}
      />
      <Base exists={!documentTemplates.length}>No results are found</Base>
      <DocumentTemplateList
        documentTemplates={documentTemplates}
        choices={choices}
      />
    </PageContent>
  </Page>
);

DocumentTemplateListPage.propTypes = propTypes;

export default enhance(DocumentTemplateListPage);
