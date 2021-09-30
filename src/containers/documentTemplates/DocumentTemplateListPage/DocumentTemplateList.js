import { Table } from 'reactstrap';
import { pure } from 'recompose';
import { arrayOf, object, shape } from 'prop-types';

import formatTime from 'src/helpers/formatTime';
import { EntityLink } from 'src/components';
import { documentTemplateType } from 'src/prop-types';

const propTypes = {
  documentTemplates: arrayOf(documentTemplateType).isRequired,
  choices: shape({
    category: object.isRequired,
  }),
};

const enhance = pure;

const DocumentTemplateList = ({
  documentTemplates,
  choices,
}) => (
  <Table striped>
    <tbody>
      {documentTemplates.map(({
        id,
        category,
        issuer,
        created,
        modified,
        description,
      }) => (
        <tr key={id}>
          <td>
            <strong>{choices.category[category]}</strong>
            <br /><br />
            Issuer: {issuer.name}
          </td>
          <td>
            Created: {formatTime(created).full()}
            <br /><br />
            Modified: {formatTime(modified).full()}
          </td>
          <td>
            {description}
          </td>
          <td>
            <EntityLink to={`/document-templates/${id}`} />
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

DocumentTemplateList.propTypes = propTypes;

export default enhance(DocumentTemplateList);
