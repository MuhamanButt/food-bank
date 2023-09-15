import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ConfirmationComponent({
  heading,
  body,
  onConfirmText,
  onConfirmHandler,
  handleClose,
  handleShow,
}) {
  const [show, setShow] = useState(true);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={onConfirmHandler}>
            {onConfirmText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmationComponent;
