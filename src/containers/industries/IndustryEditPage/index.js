import { Button } from 'reactstrap';
import { object, func } from 'prop-types';
import { Link } from 'react-router';

import { IndustryForm, Page, PageContent, PageHeader, PageFooter } from 'src/components';
import { breadcrumbsType, industryType } from 'src/prop-types';

import enhance from './enhance';


const propTypes = {
  industry: industryType.isRequired,
  validationErrors: object,
  breadcrumbs: breadcrumbsType.isRequired,

  onDelete: func.isRequired,
  onFieldChange: func.isRequired,
};

const IndustryEditPage = ({
  industry,
  breadcrumbs,
  validationErrors,

  onDelete,
  onFieldChange,
}) => (
  <Page title={`Editing ${industry.name}`}>
    <PageHeader breadcrumbs={breadcrumbs} />
    <PageContent>
      <IndustryForm
        onFieldChange={onFieldChange}
        validationErrors={validationErrors}
      />
      <PageFooter>
        <Button color="danger" onClick={onDelete}>Delete</Button>
        <Button tag={Link} to="/industries" color="success" className="float-right">Done</Button>
      </PageFooter>
    </PageContent>
  </Page>
);

IndustryEditPage.propTypes = propTypes;

export default enhance(IndustryEditPage);
