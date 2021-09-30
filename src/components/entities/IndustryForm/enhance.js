import { compose, pure, withHandlers } from 'recompose';

const handlersEnhancer = withHandlers({
  // makes a short delay which runs onFieldChange after the store is updated
  onFieldChange: ({ onFieldChange }) => (...args) => setTimeout(() => onFieldChange(...args)),
});

export default compose(
  handlersEnhancer,
  pure,
);
