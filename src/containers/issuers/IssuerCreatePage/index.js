import { Link } from 'react-router';
import { object, func } from 'prop-types';

import { Page, PageContent, PageHeader, Button, IssuerForm } from 'src/components';

import enhance from './enhance';

const propTypes = {
  validationErrors: object,

  onFieldChange: func.isRequired,
};

const breadcrumbs = [{
  label: 'Issuers',
  url: '/issuers',
}, {
  label: 'New Issuer',
}];

const ToolCreatePage = ({
  validationErrors,

  onFieldChange,
}) => (
  <Page title="New Issuer">
    <PageHeader breadcrumbs={breadcrumbs}>
      <Link to="/issuers">
        <Button color="default">Cancel</Button>
      </Link>
    </PageHeader>
    <PageContent>
      <IssuerForm
        onFieldChange={onFieldChange}
        validationErrors={validationErrors}
      />
    </PageContent>
  </Page>
);

ToolCreatePage.propTypes = propTypes;

export default enhance(ToolCreatePage);
