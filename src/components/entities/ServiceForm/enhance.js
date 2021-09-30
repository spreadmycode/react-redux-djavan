import { compose, pure, withHandlers, withPropsOnChange } from 'recompose';

import objectToOptions from 'src/helpers/objectToOptions';

const handlersEnhancer = withHandlers({
  // makes a short delay which runs onFieldChange after the store is updated
  onFieldChange: ({ onFieldChange }) => (...args) => setTimeout(() => onFieldChange(...args)),
});

const propsEnhancer = withPropsOnChange(['choices'], ({ choices }) => ({
  engagementTypeOptions: objectToOptions(choices.engagement_type),
}));

export default compose(
  handlersEnhancer,
  propsEnhancer,
  pure,
);
