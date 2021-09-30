import { Table } from 'reactstrap';
import { pure } from 'recompose';
import { arrayOf, func } from 'prop-types';

import { toolType } from 'src/prop-types';

import Tool from './Tool';

const propTypes = {
  tools: arrayOf(toolType).isRequired,
  onEdit: func.isRequired,
};

const enhance = pure;

const ToolList = ({
  tools,

  onEdit,
}) => (
  <Table striped>
    <tbody>
      {tools.map(({
        id,
        name,
        services,
        default_sort_priority,
      }) => (
        <Tool
          key={id}
          {...{
            id,
            name,
            services,
            default_sort_priority,

            onEdit,
          }}
        />
      ))}
    </tbody>
  </Table>
);

ToolList.propTypes = propTypes;

export default enhance(ToolList);
