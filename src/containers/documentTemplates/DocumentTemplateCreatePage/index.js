import { Link } from 'react-router';
import { object, func, arrayOf, shape } from 'prop-types';

import { Page, PageContent, PageHeader, Button, DocumentTemplateForm } from 'src/components';
import { issuerType } from 'src/prop-types';

import enhance from './enhance';

const propTypes = {
  choices: shape({
    category: object.isRequired,
  }).isRequired,
  issuers: arrayOf(issuerType).isRequired,
  validationErrors: object.isRequired,

  onFieldChange: func.isRequired,
};

const breadcrumbs = [{
  label: 'Document Templates',
  url: '/document-templates',
}, {
  label: 'New Template',
}];

const DocumentTemplateCreatePage = ({
  choices,
  issuers,
  validationErrors,

  onFieldChange,
}) => (
  <Page title="New Document Template">
    <PageHeader breadcrumbs={breadcrumbs}>
      <Link to="/document-templates">
        <Button color="default">Cancel</Button>
      </Link>
    </PageHeader>
    <PageContent>
      <DocumentTemplateForm
        choices={choices}
        issuers={issuers}
        validationErrors={validationErrors}

        onFieldChange={onFieldChange}
      />
    </PageContent>
  </Page>
);

DocumentTemplateCreatePage.propTypes = propTypes;

export default enhance(DocumentTemplateCreatePage);
