import { pure } from 'recompose';
import { string } from 'prop-types';

import { breadcrumbsType } from 'src/prop-types';

import BreadcrumbsItem from './BreadcrumbsItem';
import css from './style.css';

const propTypes = {
  breadcrumbs: breadcrumbsType.isRequired,
  className: string,
};

const enhance = pure;

const Breadcrumbs = ({
  breadcrumbs,
  className,
}) => (
  <ol className={`breadcrumb ${css.breadcrumbs} ${className || ''}`}>
    {breadcrumbs.map(({
        label,
        url,
        onClick,
      }) => (
        <BreadcrumbsItem
          key={label + url}
          label={label}
          url={url}
          onClick={onClick}
        />
      ))}
  </ol>
);

Breadcrumbs.propTypes = propTypes;

export default enhance(Breadcrumbs);
