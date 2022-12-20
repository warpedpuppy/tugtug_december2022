import React from 'react';
import Button from 'react-bootstrap/Button';
import Grid from '../Grid/Grid';
import './DisplayMaze.css';

const DisplayMaze = ({c, r, walls, hero, id, deleteMaze, defaultMaze, activeMaze, setActiveMaze }) => {
	const chooseMaze = () => setActiveMaze();
	return (
		<div className="displayDiv" onClick={chooseMaze} >
			<Grid r={r} c={c} walls={walls} hero={hero} />
			{
				!defaultMaze ?  <Button
					onClick={() => deleteMaze(id)}
					variant="outline-danger"
					className="delete-maze-button"
				> Delete Maze </Button>
				:
				<p>this is the default - cannot be deleted</p>
				
			}
			<p>active maze: {activeMaze.toString()} </p>
		</div>
	)
    
}
export default DisplayMaze;
