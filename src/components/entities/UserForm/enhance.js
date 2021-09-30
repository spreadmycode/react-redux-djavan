import { compose, pure, withHandlers, withState, withPropsOnChange } from 'recompose';

const handlersEnhancer = withHandlers({
  // makes a short delay which runs onFieldChange after the store is updated
  onFieldChange: ({ onFieldChange }) => (...args) => setTimeout(() => onFieldChange(...args)),
});

const profileTypeEnhancer = withState('profileType', 'onSetProfileType');

const propsEnhancer = withPropsOnChange(['clients'], ({ clients }) => ({
  clientOptions: clients.map(({ name, id }) => ({
    label: name,
    value: id,
  })),
}));

export default compose(
  handlersEnhancer,
  profileTypeEnhancer,
  propsEnhancer,
  pure,
);
