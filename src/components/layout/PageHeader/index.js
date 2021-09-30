import { string, node } from 'prop-types';
import { compose, pure, defaultProps } from 'recompose';

import { breadcrumbsType } from 'src/prop-types';
import { Breadcrumbs } from 'src/components';

import css from './style.css';

const propTypes = {
  children: node,
  breadcrumbs: breadcrumbsType.isRequired,
  title: string,
  className: string,
};

export const getDefaultPropsEnhancer = defaultProps({
  breadcrumbs: [],
});

export const enhance = compose(
  getDefaultPropsEnhancer,
  pure,
);

export const PageHeader = ({
  children,
  breadcrumbs,
  title,
  className,
}) => (
  <div className={`page-header ${className || ''}`}>
    <Base exists={!!title} component="h1" className={css.title}>{title}</Base>
    <Breadcrumbs breadcrumbs={breadcrumbs} />
    <div className="page-header-actions">
      {children}
    </div>
  </div>
);

PageHeader.propTypes = propTypes;

export default enhance(PageHeader);
