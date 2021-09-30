import { node } from 'prop-types';

const MainLayout = ({ children }) => (
  <div>
    {children}
  </div>
);

MainLayout.propTypes = {
  children: node.isRequired,
};

export default MainLayout;
