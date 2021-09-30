import { compose, pure, withPropsOnChange } from 'recompose';
import { string, number, shape, object } from 'prop-types';

import { clientType } from 'src/prop-types';
import { EntityLink } from 'src/components';
import { formatTime, formatMoney } from 'src/helpers';

const propTypes = {
  id: number.isRequired,
  composite_id: string.isRequired,
  status: string.isRequired,
  payment: string.isRequired,
  signed_date: string,
  start_date: string,
  end_date: string,
  total_due: number.isRequired,

  client: clientType.isRequired,
  assessment_count: number.isRequired,
  choices: shape({
    payment: object.isRequired,
    status: object.isRequired,
  }).isRequired,
};

const propsEnhancer = withPropsOnChange(
  ['client', 'clientsData'], ({ client, clientsData }) => ({
    client: clientsData[client] || {
      name: 'Unknown Client',
    },
  }),
);

const enhance = compose(
  propsEnhancer,
  pure,
);

const ServiceOrderListItem = ({
  id,
  composite_id,
  status,
  payment,
  signed_date,
  start_date,
  end_date,
  total_due,

  client,
  assessment_count,
  choices,
}) => (
  <tr>
    <td>
      <strong>{composite_id}</strong>
      <br /><br />
      {client.name}
    </td>
    <td>
      {client.focal_first_name}&nbsp;{client.focal_last_name}
      <br /><br />
      {client.focal_email}
      <br /><br />
      {client.focal_phone}
    </td>
    <td>
      Status:&nbsp;{choices.status[status]}
      <br /><br />
      Payment:&nbsp;{choices.status[payment]}
      <br /><br />
      {assessment_count}&nbsp;Assessments
    </td>
    <td>
      Signed:&nbsp;{formatTime(signed_date).date() || '-'}<br />
      Start:&nbsp;{formatTime(start_date).date() || '-'}<br />
      End:&nbsp;{formatTime(end_date).date() || '-'}
      <br /><br />
      <strong>Total&nbsp;Due:&nbsp;{formatMoney(total_due)}</strong>
    </td>
    <td>
      <EntityLink to={`/service-orders/${id}`} />
    </td>
  </tr>
);

ServiceOrderListItem.propTypes = propTypes;

export default enhance(ServiceOrderListItem);
