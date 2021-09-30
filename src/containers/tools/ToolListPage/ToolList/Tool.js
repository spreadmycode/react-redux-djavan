import { compose, pure, withHandlers } from 'recompose';
import { number, string, func, arrayOf } from 'prop-types';
import { PriorityVote, EntityLink } from 'src/components';

const propTypes = {
  id: number.isRequired,
  name: string.isRequired,
  services: arrayOf(number).isRequired,
  default_sort_priority: number.isRequired,

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

const Tool = ({
  id,
  name,
  services,
  default_sort_priority,

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
      <br />
      <br />
      {services.length}&nbsp;Services
    </td>
    <td>
      <EntityLink to={`/tools/${id}`} />
    </td>
  </tr>
);

Tool.propTypes = propTypes;

export default enhance(Tool);
