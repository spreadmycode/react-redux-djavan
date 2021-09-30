import { compose, pure, withHandlers } from 'recompose';
import { node, func } from 'prop-types';

import { Icon, Button } from 'src/components';

import css from './style.css';

const propTypes = {
  label: node.isRequired,
  onRemove: func.isRequired,
};

const handlersEnhancer = withHandlers({
  onRemove: ({ onRemove, value }) => () => onRemove(value),
});

const enhance = compose(
  handlersEnhancer,
  pure,
);

const AssociationsItem = ({
  label,

  onRemove,
}) => (
  <div className={css.item}>
    <span className={css.label}>{label}</span>

    <Button color="primary" outline onClick={onRemove} className={css.remove}>
      <Icon wb="close" />
    </Button>
  </div>
);

AssociationsItem.propTypes = propTypes;

export default enhance(AssociationsItem);
