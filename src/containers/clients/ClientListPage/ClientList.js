import { Table } from 'reactstrap';
import { arrayOf } from 'prop-types';

import { EntityLink } from 'src/components';
import { clientType } from 'src/prop-types';

const propTypes = {
  clients: arrayOf(clientType).isRequired,
};

const ClientList = ({ clients }) => (
  <Table striped>
    <tbody>
      {clients.map(({
        id,
        name,
        address,
        service_order_count,
        assessment_count,
        departments,
        focal_first_name,
        focal_last_name,
        focal_email,
        focal_phone,
      }) => (
        <tr key={id}>
          <td>
            <strong>{name}</strong>
            <br /><br />
            {address}
          </td>
          <td>
            {service_order_count}&nbsp;Service&nbsp;Orders
            <br /><br />
            {assessment_count}&nbsp;Assessments
            <br /><br />
            {departments.length}&nbsp;Departments
          </td>
          <td>
            {focal_first_name} {focal_last_name}
            <br /><br />
            {focal_email}
            <br /><br />
            {focal_phone}
          </td>
          <td>
            <EntityLink to={`/clients/${id}`} />
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

ClientList.propTypes = propTypes;

export default ClientList;
