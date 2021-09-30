import ReactSelect from 'react-select';
import { compose, pure, withHandlers } from 'recompose';

const handlersEnhancer = withHandlers({
  onChange: ({ onChange }) => v => onChange(v ? v.value : null),
});

const enhance = compose(
  handlersEnhancer,
  pure,
);

export default enhance(ReactSelect);
