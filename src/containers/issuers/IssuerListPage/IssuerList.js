import { Table } from 'reactstrap';
import { pure } from 'recompose';
import { arrayOf } from 'prop-types';

import { issuerType } from 'src/prop-types';
import { EntityLink } from 'src/components';

const propTypes = {
  issuers: arrayOf(issuerType).isRequired,
};

const enhance = pure;

const IssuerList = ({
  issuers,
}) => (
  <Table striped>
    <tbody>
      {issuers.map(({
        id,
        name,
        clients,
      }) => (
        <tr key={id}>
          <td>
            <strong>{name}</strong>
          </td>
          <td>
            {clients.length}&nbsp;Clients
          </td>
          <td>
            <EntityLink to={`/issuers/${id}`} />
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

IssuerList.propTypes = propTypes;

export default enhance(IssuerList);
