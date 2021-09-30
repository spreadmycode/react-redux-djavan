import { Table } from 'reactstrap';
import { arrayOf } from 'prop-types';

import { EntityLink } from 'src/components';
import { userType } from 'src/prop-types';

const propTypes = {
  users: arrayOf(userType).isRequired,
};

const UserList = ({ users }) => (
  <Table striped>
    <tbody>
      {users.map(({
        id,
        first_name,
        last_name,
        email,
      }) => (
        <tr key={id}>
          <td>{first_name} {last_name}</td>
          <td>{email}</td>
          <td>
            <EntityLink to={`/users/${id}`} />
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

UserList.propTypes = propTypes;

export default UserList;
