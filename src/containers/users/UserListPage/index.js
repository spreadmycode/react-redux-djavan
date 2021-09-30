import { Link } from 'react-router';
import { arrayOf, shape, string, number, func } from 'prop-types';

import { Page, PageContent, PageHeader, Button, Paginate } from 'src/components';
import { userType } from 'src/prop-types';

import enhance from './enhance';
import UserList from './UserList';
import UserFilters from './UserFilters';

const propTypes = {
  users: arrayOf(userType),
  filters: shape({
    contains: string,
    per_page: number,
    sort: string,
  }).isRequired,

  page: number.isRequired,
  pageCount: number.isRequired,

  onFiltersChange: func.isRequired,
  onPageChange: func.isRequired,
};

const breadcrumbs = [{ label: 'Users' }];

const UserListPage = ({
  users,
  filters,

  page,
  pageCount,

  onFiltersChange,
  onPageChange,
}) => (
  <Page title="Users">
    <PageHeader breadcrumbs={breadcrumbs}>
      <Link to="/users/new">
        <Button color="primary">Create new user</Button>
      </Link>
    </PageHeader>
    <PageContent>
      <UserFilters onFiltersChange={onFiltersChange} initialValues={filters} />
      <Base exists={!users.length}>No results are found</Base>
      <UserList users={users} />
      <Paginate
        pageCount={pageCount}
        page={page}
        onChange={onPageChange}
      />
    </PageContent>
  </Page>
);

UserListPage.propTypes = propTypes;

export default enhance(UserListPage);
