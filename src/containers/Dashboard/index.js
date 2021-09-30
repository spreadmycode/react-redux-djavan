import { Page, PageContent, PageHeader } from 'src/components';
import { userType } from 'src/prop-types';

import enhance from './enhance';

const propTypes = {
  me: userType.isRequired,
};

const Dashboard = ({
  me,
}) => (
  <Page title="Dashboard">
    <PageHeader title={`Welcome, ${me.first_name}!`} />
    <PageContent>
      Content coming soon.
    </PageContent>
  </Page>
);

Dashboard.propTypes = propTypes;

export default enhance(Dashboard);
