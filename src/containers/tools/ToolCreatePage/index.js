import { Link } from 'react-router';
import { object, func, arrayOf, shape } from 'prop-types';

import { ToolForm, Page, PageContent, PageHeader, Button } from 'src/components';
import { serviceType } from 'src/prop-types';

import enhance from './enhance';

const propTypes = {
  services: arrayOf(serviceType).isRequired,
  choices: shape({
    associated_findings: object.isRequired,
  }).isRequired,
  validationErrors: object,

  onFieldChange: func.isRequired,
};

const breadcrumbs = [{
  label: 'Clients',
  url: '/clients',
}, {
  label: 'New Client',
}];

const ToolCreatePage = ({
  services,
  choices,
  validationErrors,

  onFieldChange,
}) => (
  <Page title="New Tool">
    <PageHeader breadcrumbs={breadcrumbs}>
      <Link to="/tools">
        <Button color="default">Cancel</Button>
      </Link>
    </PageHeader>
    <PageContent>
      <ToolForm
        isNew
        services={services}
        choices={choices}
        validationErrors={validationErrors}

        onFieldChange={onFieldChange}
      />
    </PageContent>
  </Page>
);

ToolCreatePage.propTypes = propTypes;

export default enhance(ToolCreatePage);
