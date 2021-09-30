import { compose, pure, withHandlers } from 'recompose';
import { number, string, func, object, array } from 'prop-types';
import { PriorityVote, EntityLink } from 'src/components';

import css from './style.css';

const propTypes = {
  id: number.isRequired,
  name: string.isRequired,
  assetsData: object.isRequired,
  default_sort_priority: number.isRequired,
  feature_image: number,
  tools: array,

  onVote: func.isRequired,
};

const handlersEnhancer = withHandlers({
  onVote: ({ onEdit, id }) => default_sort_priority => onEdit(id, {
    default_sort_priority,
    commit: true,
  }),
});

const enhance = compose(
  handlersEnhancer,
  pure,
);

const ServiceListItem = ({
  id,
  name,
  default_sort_priority,
  feature_image,
  tools,

  assetsData,

  onVote,
}) => (
  <tr key={id}>
    <td>
      <PriorityVote
        onChange={onVote}
        value={default_sort_priority}
      />
    </td>
    <td>
      <strong>{name}</strong>
      <br /><br />
      {tools.length}&nbsp;tools
    </td>
    <td>
      <Base
        exists={feature_image}
        component="img"
        src={assetsData[feature_image].file}
        className={css.image}
        alt="Feature Image"
        title="Feature Image"
      />
    </td>
    <td>
      <EntityLink to={`/services/${id}`} />
    </td>
  </tr>
);

ServiceListItem.propTypes = propTypes;

export default enhance(ServiceListItem);
