import { Table } from 'reactstrap';
import { pure } from 'recompose';
import { arrayOf } from 'prop-types';

import { industryType } from 'src/prop-types';
import { EntityLink } from 'src/components';

const propTypes = {
  industries: arrayOf(industryType).isRequired,
};

const enhance = pure;

const IndustryList = ({
  industries,
}) => (
  <Table striped>
    <tbody>
      {industries.map(({
        id,
        name,
        clients,
        service_orders,
      }) => (
        <tr key={id}>
          <td>
            <strong>{name}</strong>
          </td>
          <td>
            {clients.length}&nbsp;Clients
          </td>
          <td>
            {service_orders.length}&nbsp;Service&nbsp;Orders
          </td>
          <td>
            <EntityLink to={`/industries/${id}`} />
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

IndustryList.propTypes = propTypes;

export default enhance(IndustryList);
