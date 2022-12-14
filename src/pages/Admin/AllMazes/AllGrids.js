import { useState } from 'react';
import DisplayMaze from './DisplayMaze';
import './AllGrids.css';
import DeleteModal from './DeleteModal';


const AllGrids = ({mazes, deleteMaze}) =>  {
	const [show, setShow ] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow = (id) => {
		setShow(true);
    };

    const deleteMazeHandler = (maze) => {
		deleteMaze(maze)
		handleClose();
    }

	const triggerModal = (id) => {
		handleShow();
	}

	const cancelModal = () => {
		handleClose();
	}

	return (
		<>
			<div className="all-grids">
				{
					mazes.map((mazeObject, index) => {
						return (
							<DisplayMaze
								key={index}
								defaultMaze={mazeObject.default || false}
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