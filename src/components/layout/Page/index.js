import {
    string,
    any,
} from 'prop-types';
import Helmet from 'react-helmet';
import { pure } from 'recompose';

import css from './style.css';

const propTypes = {
  className: string,
  title: string.isRequired,
  children: any,
};

const enhance = pure;

export const Page = ({
  className,
  title,
  children,
  ...props
}) => (
  <div
    className={`page ${css.page} ${className || ''}`}
    {...props}
  >
    <Helmet title={title} titleTemplate="%s | DJAVAN" />
    {children}
  </div>
);

Page.propTypes = propTypes;

export default enhance(Page);
