import ReactModal from 'react-modal';
import { node, bool, object, func, string, number } from 'prop-types';
import classNames from 'classnames';
import { compose, pure, withPropsOnChange } from 'recompose';

import css from './style.css';


const propTypes = {
  isOpen: bool.isRequired,
  title: string,
  closeTimeoutMS: number.isRequired,
  className: object.isRequired,
  overlayClassName: object.isRequired,
  children: node,

  onAfterOpen: func,
  onRequestClose: func.isRequired,
};

const propsEnhancer = withPropsOnChange(
  ['color', 'fillIn', 'autoClose'],
  ({ color, fillIn }) => ({
    closeTimeoutMS: 200, // autoClose ? 5000 : null,
    overlayClassName: {
      base: classNames({
        modal: true,
        fade: true,
        [`modal-${color}`]: !!color,
        'modal-fill-in': !!fillIn,
        [css.overlay]: true,
      }),
      afterOpen: 'show',
      beforeClose: css.hide,
    },
    className: {
      base: 'modal-dialog',
    },
  }),
);

const style = {
  content: {},
  overlay: {},
};

const enhance = compose(
  propsEnhancer,
  pure,
);

const Modal = ({
  isOpen,
  title,
  closeTimeoutMS,
  className,
  overlayClassName,
  children,

  onAfterOpen,
  onRequestClose,
}) => (
  <ReactModal
    isOpen={isOpen}
    closeTimeoutMS={closeTimeoutMS}
    style={style}
    className={className}
    overlayClassName={overlayClassName}
    contentLabel={title || ''}

    onAfterOpen={onAfterOpen}
    onRequestClose={onRequestClose}
  >
    <div className="modal-content">
      {children}
    </div>
  </ReactModal>
);

Modal.propTypes = propTypes;

export default enhance(Modal);
