import { Table, Row, Col } from 'reactstrap';
import { compose, pure, withState, withHandlers } from 'recompose';
import { object, string, func, number } from 'prop-types';

import { selectOptionsType } from 'src/prop-types';
import { Select, Button, Icon } from 'src/components';

import ServiceInstanceItem from './ServiceInstanceItem';
import css from './style.css';

const propTypes = {
  fields: object.isRequired,
  displaySubtotal: string,
  serviceOptions: selectOptionsType.isRequired,
  serviceInstanceValidationErrors: object.isRequired,

  serviceValue: number,

  onSetService: func.isRequired,
  onAdd: func.isRequired,
  onDelete: func.isRequired,
  onEdit: func.isRequired,
};

const serviceEnhancer = withState('serviceValue', 'onSetService', null);

const handlersEnhancer = withHandlers({
  onAdd: ({ onAdd, serviceValue, onSetService }) => () => {
    onAdd({
      service: serviceValue,
    });

    onSetService(null);
  },
});

const enhance = compose(
  serviceEnhancer,
  handlersEnhancer,
  pure,
);

const ServiceInstanceArray = ({
  fields,
  displaySubtotal,
  serviceOptions,
  serviceInstanceValidationErrors,

  serviceValue,
  onSetService,
  onAdd,
  onDelete,
  onEdit,
}) => (
  <div>
    <Table striped className={css.table}>
      <tbody>
        {fields.map(member => (
          <ServiceInstanceItem
            member={member}
            key={member}
            serviceInstanceValidationErrors={serviceInstanceValidationErrors}

            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </Table>
    <Row>
      <Col md="6" lg="6" sm="12">
        <strong>Subtotal: {displaySubtotal}</strong>
      </Col>
      <Col md="6" lg="6" sm="12">

        <Select
          className={css.select}
          options={serviceOptions}
          value={serviceValue}
          onChange={onSetService}
        />
        <Button
          color="primary"
          outline
          onClick={onAdd}
          disabled={!serviceValue}
          className={css.add}
        >
          <Icon wb="plus" />
        </Button>
      </Col>
    </Row>
  </div>
);

ServiceInstanceArray.propTypes = propTypes;

export default enhance(ServiceInstanceArray);
