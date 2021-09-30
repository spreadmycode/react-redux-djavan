import { FormGroup } from 'reactstrap';
import { pure } from 'recompose';
import { bool, number } from 'prop-types';
import { Link } from 'react-router';

import { Button } from 'src/components';

const propTypes = {
  isNew: bool,
  id: number,
};

const enhance = pure;

const ButtonsFormGroup = ({
  isNew,
  id,
}) => (
  <FormGroup>
    <Button
      disabled={isNew}
      tag={Link}
      to={`${process.env.API_URL}service-orders/${id}/pdf`}
      target="_blank"
    >Download PDF</Button>{' '}
    <Button
      disabled={isNew}
      tag={Link}
      to={`${process.env.API_URL}service-orders/${id}/preview`}
      target="_blank"
    >Preview</Button>
  </FormGroup>
);

ButtonsFormGroup.propTypes = propTypes;

export default enhance(ButtonsFormGroup);
