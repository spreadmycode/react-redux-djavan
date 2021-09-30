// we will need to add some features to button later
import { Button } from 'reactstrap';
import { compose, pure, defaultProps } from 'recompose';

const defaultPropsEnhancer = defaultProps({
  color: 'default',
});

const enhance = compose(
  defaultPropsEnhancer,
  pure,
);

export default enhance(Button);
