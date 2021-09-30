import { Table } from 'reactstrap';
import { compose, pure } from 'recompose';

import { array, object, func } from 'prop-types';
import ServiceListItem from './ServiceListItem';

const propTypes = {
  services: array.isRequired,
  assetsData: object.isRequired,
  onEdit: func.isRequired,
};

const enhance = compose(
  pure,
);

const ServiceList = ({
  services,
  assetsData,

  onEdit,
}) => (
  <Table striped>
    <tbody>
      {services.map(({
        id,
        name,
        default_sort_priority,
        feature_image,
        tools,
      }) => (
        <ServiceListItem
          key={id}
          {...{
            id,
            name,
            default_sort_priority,
            feature_image,
            tools,

            assetsData,
            onEdit,
          }}
        />
      ))}
    </tbody>
  </Table>
);

ServiceList.propTypes = propTypes;

export default enhance(ServiceList);
