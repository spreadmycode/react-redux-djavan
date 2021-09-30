import { compose, pure, withPropsOnChange, withHandlers } from 'recompose';

import objectToOptions from 'src/helpers/objectToOptions';

const propsEnhancer = withPropsOnChange(['choices', 'services'], ({ choices, services }) => ({
  findingsOptions: objectToOptions(choices.associated_findings),
  servicesOptions: services.map(({ id, name }) => ({
    value: id,
    label: name,
  })),
}));

const handlersEnhancer = withHandlers({
  // makes a short delay which runs onFieldChange after the store is updated
  onFieldChange: ({ onFieldChange }) => (...args) => setTimeout(() => onFieldChange(...args)),
});

export default compose(
  propsEnhancer,
  handlersEnhancer,
  pure,
);
