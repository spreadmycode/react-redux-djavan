import { Link } from 'react-router';
import { object, func, shape } from 'prop-types';

import { ServiceForm, Page, PageContent, PageHeader, Button } from 'src/components';

import enhance from './enhance';

const propTypes = {
  choices: shape({
    engagement_type: object.isRequired,
  }).isRequired,
  assetsData: object.isRequired,
  validationErrors: object,

  onFieldChange: func.isRequired,
  onUploadAsset: func.isRequired,
};

const breadcrumbs = [{
  label: 'Services',
  url: '/services',
}, {
  label: 'New Service',
}];

const ServiceCreatePage = ({
  choices,
  assetsData,
  validationErrors,

  onFieldChange,
  onUploadAsset,
}) => (
  <Page title="New Service">
    <PageHeader breadcrumbs={breadcrumbs}>
      <Link to="/services">
        <Button color="default">Cancel</Button>
      </Link>
    </PageHeader>
    <PageContent>
      <ServiceForm
        isNew
        choices={choices}
        assetsData={assetsData}
        validationErrors={validationErrors}

        onFieldChange={onFieldChange}
        onUploadAsset={onUploadAsset}
      />
    </PageContent>
  </Page>
);

ServiceCreatePage.propTypes = propTypes;

export default enhance(ServiceCreatePage);
