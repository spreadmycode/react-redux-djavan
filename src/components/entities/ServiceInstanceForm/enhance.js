import { compose, pure, withHandlers, withPropsOnChange } from 'recompose';

import { objectToOptions } from 'src/helpers';

const handlersEnhancer = withHandlers({
  // makes a short delay which runs onFieldChange after the store is updated
  onFieldChange: ({ onFieldChange }) => (...args) => setTimeout(onFieldChange, 0, ...args),
  onAddAdjustment: ({ onAddAdjustment, id }) => data => onAddAdjustment({
    ...data,
    service_instance: id,
  }),
});

const propsEnhancer = withPropsOnChange(
  ['services', 'choices'],
  ({ services, choices }) => ({
    serviceOptions: services.map(({ name, id }) => ({
      label: name,
      value: id,
    })),
    engagementTypeOptions: objectToOptions(choices.engagement_type),
  }),
);

export default compose(
  handlersEnhancer,
  propsEnhancer,
  pure,
);
