import { useEffect, useState } from 'react';
import './MazeCanvas.css';
import MazeAnimation from '../animations/maze-animation';
import MazeService from '../services/maze-service';

const MazeCanvas = ({activeMaze}) => {

	const [ showStartScreen, setShowStartScreen ] = useState(true);
   
    useEffect(() => {
		 MazeAnimation.init(this, activeMaze)
	}, [])
       
    const startGame = () => {
      setShowStartScreen(false)
      MazeAnimation.startGame()
    }

	useEffect(() => {
		return () => {
			MazeAnimation.stop()
		}
	})

	return <div id="maze-canvas"/>;
}
export default MazeCanvas;