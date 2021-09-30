import { pure } from 'recompose';
import { string, number, arrayOf, shape, object } from 'prop-types';

import { formatMoney, formatAdjustment } from 'src/helpers';

const propTypes = {
  name: string.isRequired,
  instances: arrayOf(shape({
    cost: number.isRequired,
    instance: object.isRequired,
  })).isRequired,
  adjustments: arrayOf(shape({
    value: number.isRequired,
    modifier: string.isRequired,
  })).isRequired,
  subtotal: number.isRequired,
  total: number.isRequired,
};

const enhance = pure;

const ServiceGroupCosts = ({
  name,
  instances,
  adjustments,
  subtotal,
  total,
}) => (
  <div>
    <h6>{name}</h6>
    <ul>
      {/* eslint-disable react/no-array-index-key */}
      {instances.map(({ cost, instance }, index) => (
        <li key={index}>
          {instance.display_name}
          {' '}
          <strong className="float-right">{formatMoney(cost)}</strong>
        </li>
      ))}
      {/* eslint-enable react/no-array-index-key */}
    </ul>
    <p>
    Subtotal:
    {' '}
      <strong className="float-right">{formatMoney(subtotal)}</strong>
    </p>
    <Base component="ul" exists={adjustments.length}>
      {/* eslint-disable react/no-array-index-key */}
      {adjustments.map(({ value, modifier }, index) => (
        <li key={index}>
          {formatAdjustment({ value, modifier })}
        </li>
      ))}
      {/* eslint-enable react/no-array-index-key */}
    </Base>
    <p>
      <u>
    Total Due:
    </u>
      {' '}
      <strong className="float-right">
        <u>
          {formatMoney(total)}
        </u>
      </strong>
    </p>
  </div>
);

ServiceGroupCosts.propTypes = propTypes;

export default enhance(ServiceGroupCosts);
