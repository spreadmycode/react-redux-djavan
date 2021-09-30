import { compose, pure, mapProps, withState, withHandlers, withPropsOnChange } from 'recompose';
import { Col, Row } from 'reactstrap';
import { bool, string, func, oneOf, number, oneOfType } from 'prop-types';
import { omit } from 'lodash';

import { Input, Checkbox, Select, FieldError, RichText, FullPageRichText, Asset } from 'src/components';
import { reduxFormInputType } from 'src/prop-types';

const propTypes = {
  input: reduxFormInputType.isRequired,
  canEdit: bool.isRequired,
  error: string,
  stateValue: oneOfType([string, number]).isRequired,
  dirtiableType: oneOf(
    ['input', 'select', 'richText', 'fullPageRichText', 'asset'],
  ).isRequired,

  onCanEditChange: func.isRequired,
  onChangeStateValue: func.isRequired,
  onChange: func.isRequired,
};

const canEditEnhancer = withState('canEdit', 'onCanEditChange', ({ input: { value } }) => value !== null);
const stateValueEnhancer = withState('stateValue', 'onChangeStateValue', ({ input: { value } }) => value);

const handlersEnhancer = withHandlers({
  onChange: ({ input: { onChange }, canEdit, stateValue }) =>
    () => onChange(canEdit ? stateValue : null),
  onCanEditChange: ({
    input: { onChange },
    dirtiableType,
    onCanEditChange,
    onChangeStateValue,
  }) => (canEdit) => {
    onCanEditChange(canEdit);

    if (canEdit) {
      if (dirtiableType !== 'asset') {
        onChange('');
      }
    } else {
      onChange(null);
      onChangeStateValue('');
    }
  },
});

const propsEnhancer = withPropsOnChange(
  ['stateValue', 'canEdit'], ({ stateValue, canEdit }) => ({
    stateValue: canEdit && stateValue ? stateValue : '',
  }),
);

const stateChangeEnhancer = withHandlers({
  onChangeStateValue: ({ dirtiableType, onChangeStateValue, onChange }) => (stateValue) => {
    onChangeStateValue(stateValue);

    if (['select', 'fullPageRichText', 'asset'].includes(dirtiableType)) {
      setTimeout(onChange);
    }
  },
});

const omitProps = mapProps(props => omit(props, ['meta']));

const enhance = compose(
  canEditEnhancer,
  stateValueEnhancer,
  handlersEnhancer,
  propsEnhancer,
  stateChangeEnhancer,
  omitProps,
  pure,
);

const ReduxDirtiable = ({
  input: { name },
  dirtiableType,
  canEdit,
  error,
  stateValue,

  onCanEditChange,
  onChangeStateValue,
  onChange,

  ...props
}) => (
  <Row>
    <Col md="4" sm="12">
      <Checkbox
        checked={canEdit}
        onChange={onCanEditChange}
        label="Customize"
        id={`dirtiable_${name}`}
      />
    </Col>
    <Col md="8" sm="12">
      <Base
        component={Input}
        exists={dirtiableType === 'input'}
        disabled={!canEdit}
        onBlur={onChange}
        onChange={onChangeStateValue}
        value={stateValue}
        passValue
        {...props}
      />

      <Base
        component={RichText}
        exists={dirtiableType === 'richText'}
        disabled={!canEdit}
        onBlur={onChange}
        onChange={onChangeStateValue}
        value={stateValue}
        {...props}
      />

      <Base
        component={Select}
        exists={dirtiableType === 'select'}
        disabled={!canEdit}
        onChange={onChangeStateValue}
        value={stateValue || ''}
        {...props}
      />

      <Base
        component={FullPageRichText}
        exists={dirtiableType === 'fullPageRichText'}
        disabled={!canEdit}
        onChange={onChangeStateValue}
        value={stateValue || ''}
        {...props}
      />

      <Base
        component={Asset}
        exists={dirtiableType === 'asset'}
        disabled={!canEdit}
        onChange={onChangeStateValue}
        value={stateValue}
        {...props}
      />
    </Col>
    <Col md="12">
      <FieldError error={error} />
    </Col>
  </Row>
);

ReduxDirtiable.propTypes = propTypes;

export default enhance(ReduxDirtiable);
