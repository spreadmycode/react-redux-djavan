import { Button } from 'reactstrap';
import { object, func } from 'prop-types';
import { Link } from 'react-router';

import { IssuerForm, Page, PageContent, PageHeader, PageFooter } from 'src/components';
import { breadcrumbsType, issuerType } from 'src/prop-types';

import enhance from './enhance';


const propTypes = {
  issuer: issuerType.isRequired,
  validationErrors: object,
  breadcrumbs: breadcrumbsType.isRequired,

  onDelete: func.isRequired,
  onFieldChange: func.isRequired,
};

const IssuerEditPage = ({
  issuer,
  breadcrumbs,
  validationErrors,

  onDelete,
  onFieldChange,
}) => (
  <Page title={`Editing ${issuer.name}`}>
    <PageHeader breadcrumbs={breadcrumbs} />
    <PageContent>
      <IssuerForm
        onFieldChange={onFieldChange}
        validationErrors={validationErrors}
      />
      <PageFooter>
        <Button color="danger" onClick={onDelete}>Delete</Button>
        <Button tag={Link} to="/issuers" color="success" className="float-right">Done</Button>
      </PageFooter>
    </PageContent>
  </Page>
);

IssuerEditPage.propTypes = propTypes;

export default enhance(IssuerEditPage);
