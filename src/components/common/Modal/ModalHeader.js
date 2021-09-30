import { pure } from 'recompose';
import { node, string, func } from 'prop-types';

const propTypes = {
  children: node,
  title: string,

  onRequestClose: func,
};

const enhance = pure;

const ModalHeader = ({
  children,
  title,

  onRequestClose,
}) => (
  <div className="modal-header">
    <Base
      component="button"
      exists={!!onRequestClose}
      type="button"
      className="close"
      aria-label="Close"
      onClick={onRequestClose}
    >
      <span aria-hidden="true">×</span>
    </Base>
    <Base
      exists={!!title}
      component="h4"
      className="modal-title"
    >
      {title}
    </Base>
    {children}
  </div>
);

ModalHeader.propTypes = propTypes;

export default enhance(ModalHeader);
