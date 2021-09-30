import { compose, pure, withPropsOnChange } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { Col, Row, FormGroup } from 'reactstrap';
import { func } from 'prop-types';

import { ReduxSelect } from 'src/components';
import { selectOptionsType } from 'src/prop-types';
import objectToOptions from 'src/helpers/objectToOptions';

const propTypes = {
  issuerOptions: selectOptionsType,
  categoryOptions: selectOptionsType,
  isDefaultOptions: selectOptionsType,

  onFiltersChange: func.isRequired,
};

const propsEnhancer = withPropsOnChange(['issuers'], ({ issuers, choices }) => ({
  issuerOptions: [
    {
      label: 'All issuers',
      value: 'all',
    },
    ...issuers.map(({ name, id, is_default }) => ({
      label: name,
      value: is_default ? '' : `${id}`,
    })),
  ],
  categoryOptions: [
    {
      label: 'All categories',
      value: '',
    },
    ...objectToOptions(choices.category),
  ],
  isDefaultOptions: [{
    label: 'All',
    value: 'all',
  }, {
    label: 'Defaults',
    value: '',
  }, {
    label: 'Non-defaults',
    value: 'non-default',
  }],
}));

const reduxFormEnhancer = reduxForm({
  form: 'documentTemplateListFilterForm',
  initialValues: {
    issuer: '',
  },
});

const enhance = compose(
  propsEnhancer,
  reduxFormEnhancer,
  pure,
);

const DocumentTemplateFilters = ({
  issuerOptions,
  categoryOptions,
  isDefaultOptions,

  onFiltersChange,
}) => (<Row>
  <Col md="4">
    <FormGroup>
      <label>Issuer</label>
      <Field
        component={ReduxSelect}
        name="issuer"
        options={issuerOptions}
        placeholder="Issuer"
        onChange={onFiltersChange}
      />
    </FormGroup>
  </Col>
  <Col md="4">
    <FormGroup>
      <label>Category</label>
      <Field
        component={ReduxSelect}
        name="category"
        options={categoryOptions}
        placeholder="Category"
        onChange={onFiltersChange}
      />
    </FormGroup>
  </Col>
  <Col md="4">
    <FormGroup>
      <label>Is Default</label>
      <Field
        component={ReduxSelect}
        name="is_default"
        options={isDefaultOptions}
        placeholder="Is Default"
        onChange={onFiltersChange}
      />
    </FormGroup>
  </Col>
</Row>);

DocumentTemplateFilters.propTypes = propTypes;

export default enhance(DocumentTemplateFilters);
