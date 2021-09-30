import { Link } from 'react-router';
import { object, func } from 'prop-types';

import { Page, PageContent, PageHeader, Button, IndustryForm } from 'src/components';

import enhance from './enhance';

const propTypes = {
  validationErrors: object,

  onFieldChange: func.isRequired,
};

const breadcrumbs = [{
  label: 'Industries',
  url: '/industries',
}, {
  label: 'New Industry',
}];

const ToolCreatePage = ({
  validationErrors,

  onFieldChange,
}) => (
  <Page title="New Industry">
    <PageHeader breadcrumbs={breadcrumbs}>
      <Link to="/industries">
        <Button color="default">Cancel</Button>
      </Link>
    </PageHeader>
    <PageContent>
      <IndustryForm
        onFieldChange={onFieldChange}
        validationErrors={validationErrors}
      />
    </PageContent>
  </Page>
);

ToolCreatePage.propTypes = propTypes;

export default enhance(ToolCreatePage);
