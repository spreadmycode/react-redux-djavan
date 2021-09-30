import {
    string,
    any,
} from 'prop-types';

import { pure } from 'recompose';

import css from './style.css';

const propTypes = {
  className: string,
  children: any,
};

const enhance = pure;

const PageContent = ({
    className,
    children,
    ...props
}) => (
  <div className={`page-content${className ? ` ${className}` : ''} ${css.pageContent}`} {...props}>
    {children}
  </div>
);

PageContent.propTypes = propTypes;

export default enhance(PageContent);
