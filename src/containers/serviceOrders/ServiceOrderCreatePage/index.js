import { Link } from 'react-router';
import { object, func, arrayOf, objectOf } from 'prop-types';

import { Page, PageContent, PageHeader, Button, ServiceOrderForm } from 'src/components';
import { clientType, userType, industryType } from 'src/prop-types';

import enhance from './enhance';

const propTypes = {
  choices: object.isRequired,
  clients: arrayOf(clientType).isRequired,
  users: arrayOf(userType).isRequired,
  industries: arrayOf(industryType).isRequired,
  usersData: objectOf(userType).isRequired,
  validationErrors: object.isRequired,

  onFieldChange: func.isRequired,
};

const breadcrumbs = [{
  label: 'Service Orders',
  url: '/service-orders',
}, {
  label: 'New Service Order',
}];

const ToolCreatePage = ({
  choices,
  clients,
  users,
  industries,
  usersData,
  validationErrors,

  onFieldChange,
}) => (
  <Page title="New Service Order">
    <PageHeader breadcrumbs={breadcrumbs}>
      <Link to="/service-orders">
        <Button color="default">Cancel</Button>
      </Link>
    </PageHeader>
    <PageContent>
      <ServiceOrderForm {...{
        isNew: true,
        validationErrors,
        breadcrumbs,
        clients,
        users,
        industries,
        focalProfiles: [],
        usersData,
        choices,

        onFieldChange,
      }}
      />
    </PageContent>
  </Page>
);

ToolCreatePage.propTypes = propTypes;

export default enhance(ToolCreatePage);
