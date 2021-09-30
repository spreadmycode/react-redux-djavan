import { node } from 'prop-types';

const propTypes = {
  children: node,
};

const PageFooter = ({ children }) => (
  <div>{children}</div>
);

PageFooter.propTypes = propTypes;

export default PageFooter;
