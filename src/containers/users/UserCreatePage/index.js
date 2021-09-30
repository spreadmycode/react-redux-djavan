import { Link } from 'react-router';
import { object, func, arrayOf, objectOf } from 'prop-types';

import { clientType, assetType } from 'src/prop-types';
import { Page, PageContent, PageHeader, Button, UserForm } from 'src/components';

import enhance from './enhance';

const propTypes = {
  clients: arrayOf(clientType).isRequired,
  assetsData: objectOf(assetType),
  validationErrors: object,

  onUpload: func.isRequired,
  onFieldChange: func.isRequired,
};

const breadcrumbs = [{
  label: 'Users',
  url: '/users',
}, {
  label: 'New User',
}];

const ToolCreatePage = ({
  clients,
  assetsData,
  validationErrors,

  onUpload,
  onFieldChange,
}) => (
  <Page title="New User">
    <PageHeader breadcrumbs={breadcrumbs}>
      <Link to="/users">
        <Button color="default">Cancel</Button>
      </Link>
    </PageHeader>
    <PageContent>
      <UserForm
        isNew
        clients={clients}
        assetsData={assetsData}
        validationErrors={validationErrors}
        onUpload={onUpload}
        onFieldChange={onFieldChange}
      />
    </PageContent>
  </Page>
);

ToolCreatePage.propTypes = propTypes;

export default enhance(ToolCreatePage);
