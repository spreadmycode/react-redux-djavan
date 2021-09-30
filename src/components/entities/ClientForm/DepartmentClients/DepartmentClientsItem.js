import { compose, pure, withHandlers } from 'recompose';
import { number, string, func } from 'prop-types';

import css from './style.css';

const propTypes = {
  name: string.isRequired,
  focal_first_name: string.isRequired,
  focal_last_name: string.isRequired,
  service_order_count: number.isRequired,
  assessment_count: number.isRequired,

  onGoToClient: func.isRequired,
};

const handlersEnhancer = withHandlers({
  onGoToClient: ({ onRedirect, id }) => () => onRedirect(`/clients/${id}`),
});

const enhance = compose(
  handlersEnhancer,
  pure,
);

const DepartmentClientsItem = ({
  name,
  focal_first_name,
  focal_last_name,
  service_order_count,
  assessment_count,

  onGoToClient,
}) => (
  <tr className={css.item} onClick={onGoToClient}>
    <td>{name}</td>
    <td>{focal_first_name} {focal_last_name}</td>
    <td>{service_order_count}</td>
    <td>{assessment_count}</td>
  </tr>
);

DepartmentClientsItem.propTypes = propTypes;

export default enhance(DepartmentClientsItem);
