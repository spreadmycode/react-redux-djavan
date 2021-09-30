import { Table } from 'reactstrap';
import { pure } from 'recompose';
import { arrayOf, object, shape } from 'prop-types';

import { serviceOrderType } from 'src/prop-types';

import ServiceOrderListItem from './ServiceOrderListItem';

const propTypes = {
  serviceOrders: arrayOf(serviceOrderType).isRequired,
  clientsData: object.isRequired,
  choices: shape({
    payment: object.isRequired,
    status: object.isRequired,
  }).isRequired,
};

const enhance = pure;

const ServiceOrderList = ({
  serviceOrders,
  clientsData,
  choices,
}) => (
  <Table striped>
    <tbody>
      {serviceOrders.map(({
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
      }) => (
        <ServiceOrderListItem {...{
          key: id,
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

          clientsData,
          choices,
        }}
        />
      ))}
    </tbody>
  </Table>
);

ServiceOrderList.propTypes = propTypes;

export default enhance(ServiceOrderList);
