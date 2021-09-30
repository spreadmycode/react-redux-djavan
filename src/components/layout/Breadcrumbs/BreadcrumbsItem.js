import { compose, pure, withHandlers } from 'recompose';
import { Link } from 'react-router';
import { string, func, node } from 'prop-types';

const propTypes = {
  label: node.isRequired,
  url: string,

  onClick: func,
  decoratedOnClick: func,
};

const handlersEnhancer = withHandlers({
  decoratedOnClick: ({ onClick }) => (evt) => {
    evt.preventDefault();
    onClick();
  },
});

const enhance = compose(
  handlersEnhancer,
  pure,
);

const BreadcrumbsItem = ({
  label,
  url,

  onClick,
  decoratedOnClick,
}) => (
  <li className="breadcrumb-item" key={url + label}>
    <Base exists={!!url} component={Link} to={url}>{label}</Base>
    <Base exists={!url && onClick} component="a" onClick={decoratedOnClick} href="#">{label}</Base>
    <Base exists={!url && !onClick} component="span">{label}</Base>
  </li>
);

BreadcrumbsItem.propTypes = propTypes;

export default enhance(BreadcrumbsItem);
