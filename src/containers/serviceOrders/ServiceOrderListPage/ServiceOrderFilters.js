import { compose, pure, withPropsOnChange } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { Col, Row, FormGroup } from 'reactstrap';
import { func } from 'prop-types';

import { ReduxInput, ReduxSelect } from 'src/components';
import { selectOptionsType } from 'src/prop-types';
import objectToOptions from 'src/helpers/objectToOptions';

const propTypes = {
  statusOptions: selectOptionsType,

  onFiltersChange: func.isRequired,
};

const reduxFormEnhancer = reduxForm({
  form: 'serviceOrderListFilterForm',
});

const sortOptions = [{
  label: 'Date Created',
  value: '',
}, {
  label: 'Company Name',
  value: 'client.name',
}, {
  label: 'Number of Assessments',
  value: 'assessment_count',
}];

const perPageOptions = [
  { value: '', label: 'Display 10' },
  { value: '50', label: 'Display 50' },
  { value: '100', label: 'Display 100' },
  { value: '1000', label: 'Display All' },
];

const propsEnhancer = withPropsOnChange(['choices'], ({ choices }) => ({
  statusOptions: objectToOptions(choices.status),
}));

const enhance = compose(
  reduxFormEnhancer,
  propsEnhancer,
  pure,
);

const ServiceOrderFilters = ({
  statusOptions,

  onFiltersChange,
}) => (<Row>
  <Col md="6">
    <FormGroup>
      <label>Sort</label>
      <Field
        component={ReduxSelect}
        name="sort"
        options={sortOptions}
        placeholder="Sort"
        onChange={onFiltersChange}
      />
    </FormGroup>
  </Col>
  <Col md="6">
    <FormGroup>
      <label>Items per Page</label>
      <Field
        component={ReduxSelect}
        name="per_page"
        options={perPageOptions}
        placeholder="Items per Page"
        onChange={onFiltersChange}
        searchable={false}
        clearable={false}
      />
    </FormGroup>
  </Col>
  <Col md="6">
    <FormGroup>
      <label>SO Status</label>
      <Field
        component={ReduxSelect}
        name="status"
        options={statusOptions}
        placeholder="SO Status"
        onChange={onFiltersChange}
      />
    </FormGroup>
  </Col>
  <Col md="6">
    <FormGroup>
      <label>Search</label>
      <Field
        component={ReduxInput}
        name="client"
        placeholder="Filter by client name..."
        onBlur={onFiltersChange}
        onPressEnter={onFiltersChange}
      />
    </FormGroup>
  </Col>
</Row>);

ServiceOrderFilters.propTypes = propTypes;

export default enhance(ServiceOrderFilters);
