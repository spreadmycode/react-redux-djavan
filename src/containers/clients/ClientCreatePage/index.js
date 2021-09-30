import { Link } from 'react-router';
import { arrayOf, object, func } from 'prop-types';

import { ClientForm, Page, PageContent, PageHeader, Button } from 'src/components';
import { clientType, issuerType, userType, industryType } from 'src/prop-types';

import enhance from './enhance';

const propTypes = {
  parents: arrayOf(clientType).isRequired,
  issuers: arrayOf(issuerType).isRequired,
  users: arrayOf(userType).isRequired,
  industries: arrayOf(industryType).isRequired,

  validationErrors: object,

  onFieldChange: func.isRequired,
};

const breadcrumbs = [{
  label: 'Clients',
  url: '/clients',
}, {
  label: 'New Client',
}];

const ClientCreatePage = ({
  parents,
  issuers,
  users,
  industries,

  validationErrors,

  onFieldChange,
}) => (
  <Page title="New Client">
    <PageHeader breadcrumbs={breadcrumbs}>
      <Link to="/clients">
        <Button color="default">Cancel</Button>
      </Link>
    </PageHeader>
    <PageContent>
      <ClientForm
        parents={parents}
        issuers={issuers}
        users={users}
        industries={industries}
        validationErrors={validationErrors}

        onFieldChange={onFieldChange}
      />
    </PageContent>
  </Page>
);

ClientCreatePage.propTypes = propTypes;

export default enhance(ClientCreatePage);
