import { useState } from 'react';
import MazeService from '../../../services/maze-service';
import DisplayMaze from './DisplayMaze';
import './AllGrids.css';
import DeleteModal from './DeleteModal';


const AllGrids = props =>  {
	const [show, setShow ] = useState(false);
	const [idToDelete, setIDToDelete] = useState(undefined);
    const handleClose = () => setShow(false);

    const handleShow = (id) => {
		setShow(true);
		setIDToDelete(id);
    };

    const deleteMazeHandler = (maze) => {
		props.deleteMaze(mazeToDelete)
		handleClose();
    }

	const triggerModal = (id) => {
		handleShow();
		setIDToDelete(id);
	}

	const cancelModal = () => {
		handleClose();
		setIDToDelete(undefined);
	}

	return (
		<>
		<div className="all-grids">
			{
				props.mazes.map((mazeObject, index) => {
					return (
						<DisplayMaze
							key={index}
							deleteMaze={() => triggerModal(index)}
							{...mazeObject}
						/>
					)
				})
			}
		</div>
		<DeleteModal 
			show={show} 
			handleClose={handleClose} 
			deleteMazeHandler={deleteMazeHandler} 
			cancelModal={cancelModal} />
		</>
	)
}
export default AllGrids;