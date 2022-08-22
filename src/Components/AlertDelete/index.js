import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function AlertDelete({ openDeleteModal, setOpenDeleteModal, onDelete }) {
  return (
    <>
      <Modal
        show={openDeleteModal}
        onHide={setOpenDeleteModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this note</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={setOpenDeleteModal}>
            No
          </Button>
          <Button variant="primary" onClick={onDelete}>
            Yes i am sure
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
