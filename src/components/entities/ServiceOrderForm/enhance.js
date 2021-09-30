import { compose, pure, withHandlers, withPropsOnChange, defaultProps } from 'recompose';

import objectToOptions from 'src/helpers/objectToOptions';

const defaultPropsEnhancer = defaultProps({
  // serviceGroupChoices is required at edit page
  serviceGroupChoices: { frequency: {} },
  services: [],
});

const handlersEnhancer = withHandlers({
  // makes a short delay which runs onFieldChange after the store is updated
  onFieldChange: ({ onFieldChange }) => (...args) => setTimeout(onFieldChange, 0, ...args),
  onAddServiceGroup: ({ onAddServiceGroup, id }) => () => onAddServiceGroup({
    service_order: id,
    commit: true,
  }),
});

const propsEnhancer = withPropsOnChange(
  ['choices', 'serviceGroupChoices', 'clients', 'users', 'industries', 'focalProfiles', 'services'],
  ({ choices, serviceGroupChoices, clients, users, industries, focalProfiles, services }) => ({
    statusOptions: objectToOptions(choices.status),
    paymentOptions: objectToOptions(choices.payment),
    frequencyOptions: objectToOptions(serviceGroupChoices.frequency),
    clientOptions: clients.map(({ name, id }) => ({
      label: name,
      value: id,
    })),
    userOptions: users.map(({ first_name, last_name, email, id }) => ({
      label: first_name && last_name ? `${first_name} ${last_name}` : email,
      value: id,
    })),
    industryOptions: industries.map(({ name, id }) => ({
      label: name,
      value: id,
    })),
    focalProfileOptions: focalProfiles.map(({ title, id }) => ({
      label: title || 'No title',
      value: id,
    })),
    serviceOptions: services.map(({ name, id }) => ({
      label: name,
      value: id,
    })),
  }),
);


export default compose(
  defaultPropsEnhancer,
  handlersEnhancer,
  propsEnhancer,
  pure,
);
