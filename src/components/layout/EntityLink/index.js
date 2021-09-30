import { pure } from 'recompose';
import { string } from 'prop-types';
import { Link } from 'react-router';

import { Button, Icon } from 'src/components';

const propTypes = {
  to: string.isRequired,
};

const enhance = pure;

const EntityLink = ({ to }) => (
  <Link to={to}>
    <Button color="primary" outline className="btn-floating">
      <Icon wb="arrow-right" />
    </Button>
  </Link>
);

EntityLink.propTypes = propTypes;

export default enhance(EntityLink);
