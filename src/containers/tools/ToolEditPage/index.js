import { Button } from 'reactstrap';
import { object, func, arrayOf, shape } from 'prop-types';
import { Link } from 'react-router';

import { ToolForm, Page, PageContent, PageHeader, PageFooter } from 'src/components';
import { breadcrumbsType, serviceType, toolType } from 'src/prop-types';

import enhance from './enhance';


const propTypes = {
  tool: toolType.isRequired,
  validationErrors: object,
  services: arrayOf(serviceType).isRequired,
  choices: shape({
    associated_findings: object.isRequired,
  }).isRequired,
  breadcrumbs: breadcrumbsType.isRequired,

  onDelete: func.isRequired,
  onFieldChange: func.isRequired,
};

const ToolEditPage = ({
  tool,
  breadcrumbs,
  services,
  choices,
  validationErrors,

  onDelete,
  onFieldChange,
}) => (
  <Page title={`Editing ${tool.name}`}>
    <PageHeader breadcrumbs={breadcrumbs} />
    <PageContent>
      <ToolForm
        services={services}
        choices={choices}
        validationErrors={validationErrors}

        onFieldChange={onFieldChange}
      />
      <PageFooter>
        <Button color="danger" onClick={onDelete}>Delete</Button>
        <Button tag={Link} to="/tools" color="success" className="float-right">Done</Button>
      </PageFooter>
    </PageContent>
  </Page>
);

ToolEditPage.propTypes = propTypes;

export default enhance(ToolEditPage);
