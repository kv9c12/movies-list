import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

const RenderModal = ({ hideModal = () => { }, showModal = false, title = "", overview = "" }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        hideModal();
        setShow(false);
    }

    useEffect(() => {
        showModal ? setShow(true) : setShow(false)
    }, [showModal]);

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{overview}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RenderModal;