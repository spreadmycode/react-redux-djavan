import { Button } from 'reactstrap';
import { object, func, arrayOf, shape } from 'prop-types';
import { Link } from 'react-router';

import { DocumentTemplateForm, Page, PageContent, PageHeader, PageFooter } from 'src/components';
import { breadcrumbsType, issuerType, documentTemplateType } from 'src/prop-types';

import enhance from './enhance';


const propTypes = {
  breadcrumbs: breadcrumbsType.isRequired,
  choices: shape({
    category: object.isRequired,
  }).isRequired,
  issuers: arrayOf(issuerType).isRequired,
  documentTemplate: documentTemplateType.isRequired,
  validationErrors: object.isRequired,

  onDelete: func.isRequired,
  onFieldChange: func.isRequired,
};

const DocumentTemplateEditPage = ({
  breadcrumbs,
  choices,
  issuers,
  documentTemplate,
  validationErrors,

  onDelete,
  onFieldChange,
}) => (
  <Page title={`Editing Document Template #${documentTemplate.id}`}>
    <PageHeader breadcrumbs={breadcrumbs} />
    <PageContent>
      <DocumentTemplateForm
        created={documentTemplate.created}
        modified={documentTemplate.last_modified}
        choices={choices}
        issuers={issuers}
        validationErrors={validationErrors}
        onFieldChange={onFieldChange}
      />
      <PageFooter>
        <Button color="danger" onClick={onDelete}>Delete</Button>
        <Button tag={Link} to="/document-templates" color="success" className="float-right">Done</Button>
      </PageFooter>
    </PageContent>
  </Page>
);

DocumentTemplateEditPage.propTypes = propTypes;

export default enhance(DocumentTemplateEditPage);
