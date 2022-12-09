import React from 'react'
import './AllCanvas.css'
import Maze from '../animations/maze-animation';
import loadPixi from '../loadPixi';
import { useEffect, useState } from "react";

const CanvasMaze = props => {

	const [ loaded, setLoaded ] = useState(false);
	const [ maze, setMaze ] = useState(undefined);
	useEffect(() => {
		if (!loaded) loadPixi(fireUp)
	}, [])

	// useEffect(() => {
	// 	if (!maze && loaded) setMaze(new Maze());
	// }, [loaded])

	async function fireUp(){
		await setLoaded(true);
		setMaze(new Maze());
	}


	return <div id="maze-canvas" className="canvasParent" />

}

export default CanvasMaze;