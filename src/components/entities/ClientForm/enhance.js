import { compose, pure, withPropsOnChange, withHandlers } from 'recompose';

const selectsOptionsEnhancer = withPropsOnChange([
  'parents',
  'issuers',
  'users',
  'industries',
], ({ parents, issuers, users, industries }) => ({
  parentsOptions: parents.map(({ id, name }) => ({
    value: id,
    label: name,
  })),
  issuersOptions: issuers.map(({ id, name }) => ({
    value: id,
    label: name,
  })),
  projectManagerOptions: users.map(({ id, first_name, last_name }) => ({
    value: id,
    label: first_name && last_name ?
      `${first_name} ${last_name}` :
      <em>Empty name</em>,
  })),
  industriesOptions: industries.map(({ id, name }) => ({
    value: id,
    label: name,
  })),
}));

// this little trick allows to call onFieldChange after redux-form updates the store
const handlersEnhancer = withHandlers({
  onFieldChange: ({ onFieldChange }) => () => setTimeout(() => onFieldChange()),
});

export default compose(
  selectsOptionsEnhancer,
  handlersEnhancer,
  pure,
);
