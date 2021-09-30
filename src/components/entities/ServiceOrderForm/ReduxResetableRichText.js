import { compose, pure, withHandlers } from 'recompose';
import { Col, Row } from 'reactstrap';
import { string, func } from 'prop-types';

import { FieldError, FullPageRichText, Button } from 'src/components';
import { reduxFormInputType, breadcrumbsType } from 'src/prop-types';

const propTypes = {
  input: reduxFormInputType.isRequired,
  error: string,

  parentBreadcrumbs: breadcrumbsType.isRequired,
  breadcrumbLabel: string.isRequired,
  editButtonLabel: string.isRequired,

  onReset: func.isRequired,
  onChange: func.isRequired,
};

const handlersEnhancer = withHandlers({
  onChange: ({ input: { onChange } }) => onChange,
  onReset: ({ input: { onChange } }) => () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to reset the field?')) {
      onChange(null);
    }
  },
});

const enhance = compose(
  handlersEnhancer,
  pure,
);

const ReduxCustomizableRichText = ({
  input: { value },
  error,

  parentBreadcrumbs,
  breadcrumbLabel,
  editButtonLabel,

  onReset,
  onChange,
}) => (
  <Row>
    <Col md="4" sm="12">
      <Button onClick={onReset} block>Reset</Button>
    </Col>
    <Col md="8" sm="12">
      <FullPageRichText
        onChange={onChange}
        parentBreadcrumbs={parentBreadcrumbs}
        breadcrumbLabel={breadcrumbLabel}
        value={value}
        editButtonLabel={editButtonLabel}
      />
    </Col>
    <Col md="12">
      <FieldError error={error} />
    </Col>
  </Row>
);

ReduxCustomizableRichText.propTypes = propTypes;

export default enhance(ReduxCustomizableRichText);
