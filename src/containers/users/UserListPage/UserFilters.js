import { compose, pure } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { Col, Row, FormGroup } from 'reactstrap';
import { func } from 'prop-types';

import { ReduxInput, ReduxSelect } from 'src/components';

const propTypes = {
  onFiltersChange: func.isRequired,
};

const typeOptions = [
  { value: '', label: 'All' },
  { value: 'rhino', label: 'Rhino' },
  { value: 'focals', label: 'Focals' },
];

const sortOptions = [
  { value: 'profile.created', label: 'Date Created' },
  { value: 'last_name', label: 'Last Name' },
  { value: 'focal_name', label: 'Focal Name' },
];

const perPageOptions = [
  { value: '', label: 'Display 10' },
  { value: '50', label: 'Display 50' },
  { value: '100', label: 'Display 100' },
  { value: '1000', label: 'Display All' },
];

const reduxFormEnhancer = reduxForm({
  form: 'userListFilterForm',
  pure: true,
});

const enhance = compose(
  reduxFormEnhancer,
  pure,
);

const UserFilters = ({
  onFiltersChange,
}) => (<Row>
  <Col md="6" lg="3">
    <FormGroup>
      <label>Profile Type</label>
      <Field
        component={ReduxSelect}
        name="profile_type"
        options={typeOptions}
        placeholder="Profile Type"
        onChange={onFiltersChange}
      />
    </FormGroup>
  </Col>
  <Col md="6" lg="3">
    <label>Sort</label>
    <FormGroup>
      <Field
        component={ReduxSelect}
        name="sort"
        options={sortOptions}
        placeholder="Sort"
        onChange={onFiltersChange}
      />
    </FormGroup>
  </Col>
  <Col md="6" lg="3">
    <label>Items Per Page</label>
    <FormGroup>
      <Field
        component={ReduxSelect}
        name="per_page"
        options={perPageOptions}
        placeholder="Items Per Page"
        onChange={onFiltersChange}
        searchable={false}
        clearable={false}
      />
    </FormGroup>
  </Col>
  <Col md="6" lg="3">
    <label>Filter by</label>
    <FormGroup>
      <Field
        component={ReduxInput}
        name="contains"
        type="text"
        placeholder="Filter..."
        onBlur={onFiltersChange}
        onPressEnter={onFiltersChange}
      />
    </FormGroup>
  </Col>
</Row>);

UserFilters.propTypes = propTypes;

export default enhance(UserFilters);
