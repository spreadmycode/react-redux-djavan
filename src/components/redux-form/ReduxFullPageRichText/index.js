import { pure } from 'recompose';

import { FullPageRichText } from 'src/components';
import { reduxFormInputType } from 'src/prop-types';

const propTypes = {
  input: reduxFormInputType.isRequired,
};

const enhance = pure;

const ReduxFullPageRichText = ({
  input: { value, onChange },
  ...props
}) => (
  <FullPageRichText
    value={value}
    onChange={onChange}
    {...props}
  />
);

ReduxFullPageRichText.propTypes = propTypes;

export default enhance(ReduxFullPageRichText);
