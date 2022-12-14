import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
const DeleteModal = ({show, handleClose, deleteMazeHandler, cancelModal}) => {
	return (
		<Modal show={show} onHide={handleClose}>
		<Modal.Header closeButton>
		  <Modal.Title>Maze Deleterizer</Modal.Title>
		</Modal.Header>
		<Modal.Body>You are sure you want to delete?</Modal.Body>
		<Modal.Footer>
		  <Button variant="danger" onClick={deleteMazeHandler}>
				confirm delete
		  </Button>
		  <Button variant="warning" onClick={cancelModal}>
				cancel delete
		  </Button>
		</Modal.Footer>
	  </Modal>
	)
}
export default DeleteModal;