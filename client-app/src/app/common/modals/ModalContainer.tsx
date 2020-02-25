import React, { useContext } from "react";
import { Modal } from "semantic-ui-react";
import { RootStoreContext } from "../../stores/rootStore";

const ModalContainer = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    modal: { open, body },
    closeModal
  } = rootStore.modalStore;

  return (
    <Modal open={open} onClose={closeModal} size="mini">
      <Modal.Content>Our component will go here</Modal.Content>
    </Modal>
  );
};

export default ModalContainer;
