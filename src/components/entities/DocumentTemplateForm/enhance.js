import { compose, pure, withHandlers, withPropsOnChange } from 'recompose';

import objectToOptions from 'src/helpers/objectToOptions';

const handlersEnhancer = withHandlers({
  // makes a short delay which runs onFieldChange after the store is updated
  onFieldChange: ({ onFieldChange }) => (...args) => setTimeout(() => onFieldChange(...args)),
});


const propsEnhancer = withPropsOnChange(['choices', 'issuers'], ({ choices, issuers }) => ({
  categoryOptions: objectToOptions(choices.category),
  issuerOptions: issuers.map(({ name, id }) => ({
    value: id,
    label: name,
  })),
}));

export default compose(
  handlersEnhancer,
  propsEnhancer,
  pure,
);
