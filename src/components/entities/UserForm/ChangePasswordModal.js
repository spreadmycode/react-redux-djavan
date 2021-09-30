import { pure } from 'recompose';
import { FormGroup } from 'reactstrap';
import { bool, func } from 'prop-types';

import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Button } from 'src/components';

const propTypes = {
  isOpen: bool.isRequired,

  onClosePasswordModal: func.isRequired,
};

const enhance = pure;

const ChangePasswordModal = ({
  isOpen,

  onClosePasswordModal,
}) => (
  <Modal
    isOpen={isOpen}
    title="Change Password"
    onRequestClose={onClosePasswordModal}
  >
    <ModalHeader onRequestClose={onClosePasswordModal} title="Change Password" />
    <ModalBody>
      <FormGroup>
        <label>Old Password</label>
        <Input
          placeholder="Old Password"
          type="password"
        />
      </FormGroup>
      <FormGroup>
        <label>New Password</label>
        <Input
          placeholder="New Password"
          type="password"
        />
      </FormGroup>
      <FormGroup>
        <label>Confirm</label>
        <Input
          placeholder="Confirm"
          type="password"
        />
      </FormGroup>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={onClosePasswordModal}>Change</Button>
    </ModalFooter>
  </Modal>
);

ChangePasswordModal.propTypes = propTypes;

export default enhance(ChangePasswordModal);
