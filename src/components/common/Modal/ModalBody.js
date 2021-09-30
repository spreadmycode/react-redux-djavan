import { pure } from 'recompose';
import { node } from 'prop-types';

import css from './style.css';

const propTypes = {
  children: node,
};

const enhance = pure;

const ModalBody = ({ children }) => (
  <div className={`modal-body ${css.body}`}>
    {children}
  </div>
);

ModalBody.propTypes = propTypes;

export default enhance(ModalBody);
