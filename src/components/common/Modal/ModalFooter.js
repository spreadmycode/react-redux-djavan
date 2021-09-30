import { pure } from 'recompose';
import { node } from 'prop-types';

const propTypes = {
  children: node,
};

const enhance = pure;

const ModalFooter = ({ children }) => (
  <div className="modal-footer">
    {children}
  </div>
);

ModalFooter.propTypes = propTypes;

export default enhance(ModalFooter);
