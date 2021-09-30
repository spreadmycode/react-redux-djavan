import { Button } from 'reactstrap';
import { object, func, arrayOf, objectOf } from 'prop-types';
import { Link } from 'react-router';

import { UserForm, Page, PageContent, PageHeader, PageFooter } from 'src/components';
import { breadcrumbsType, userType, clientType, assetType } from 'src/prop-types';

import enhance from './enhance';

const propTypes = {
  user: userType.isRequired,
  clients: arrayOf(clientType).isRequired,
  validationErrors: object,
  assetsData: objectOf(assetType).isRequired,
  breadcrumbs: breadcrumbsType.isRequired,

  onDelete: func.isRequired,
  onFieldChange: func.isRequired,
  onUpload: func.isRequired,
};

const UserEditPage = ({
  user,
  clients,
  breadcrumbs,
  assetsData,
  validationErrors,

  onDelete,
  onFieldChange,
  onUpload,
}) => (
  <Page title={`Editing ${user.first_name} ${user.last_name}`}>
    <PageHeader breadcrumbs={breadcrumbs} />
    <PageContent>
      <UserForm
        clients={clients}
        assetsData={assetsData}
        validationErrors={validationErrors}
        onUpload={onUpload}
        onFieldChange={onFieldChange}
      />
      <PageFooter>
        <Button color="danger" onClick={onDelete}>Delete</Button>
        <Button tag={Link} to="/users" color="success" className="float-right">Done</Button>
      </PageFooter>
    </PageContent>
  </Page>
);

UserEditPage.propTypes = propTypes;

export default enhance(UserEditPage);
