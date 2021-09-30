import { pure } from 'recompose';
import { Table, FormGroup } from 'reactstrap';
import { arrayOf, func } from 'prop-types';

import { clientType } from 'src/prop-types';

import DepartmentClientsItem from './DepartmentClientsItem';

const propTypes = {
  departmentClients: arrayOf(clientType),

  onRedirect: func.isRequired,
};

const enhance = pure;

const DepartmentClients = ({
  departmentClients,

  onRedirect,
}) => (
  <FormGroup tag="fieldset">
    <legend>Department Clients</legend>
    <Table striped bordered responsive hover>
      <thead>
        <tr>
          <th>Client Name</th>
          <th>Focal Name</th>
          <th>SO count</th>
          <th>Assessment Count</th>
        </tr>
      </thead>
      <tbody>
        {departmentClients.map(({
        id,
        name,
        focal_first_name,
        focal_last_name,
        service_order_count,
        assessment_count,
      }) => (<DepartmentClientsItem {...{
        key: id,
        id,
        name,
        focal_first_name,
        focal_last_name,
        service_order_count,
        assessment_count,

        onRedirect,
      }}
      />))}
      </tbody>
    </Table>
  </FormGroup>
);

DepartmentClients.propTypes = propTypes;

export default enhance(DepartmentClients);
