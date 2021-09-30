import { compose, pure } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { Col, Row, FormGroup } from 'reactstrap';
import { func } from 'prop-types';

import { ReduxInput } from 'src/components';

const propTypes = {
  onFiltersChange: func.isRequired,
};

const reduxFormEnhancer = reduxForm({
  form: 'toolListFilterForm',
});

const enhance = compose(
  reduxFormEnhancer,
  pure,
);

const ToolFilters = ({
  onFiltersChange,
}) => (<Row>
  <Col md="12">
    <FormGroup>
      <label>Filter by Name</label>
      <Field
        component={ReduxInput}
        name="contains"
        placeholder="Filter..."
        onBlur={onFiltersChange}
        onPressEnter={onFiltersChange}
      />
    </FormGroup>
  </Col>
</Row>);

ToolFilters.propTypes = propTypes;

export default enhance(ToolFilters);
