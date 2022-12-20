import { useEffect, useState } from 'react';
import './MazeCanvas.css';
import MazeAnimation from '../animations/maze-animation';
import MazeService from '../services/maze-service';

const MazeCanvas = ({activeMaze}) => {

	const [ showStartScreen, setShowStartScreen ] = useState(true);
   
    useEffect(() => {
		console.log('maze canvas did mount')
		//  MazeAnimation.init(this, activeMaze)
	}, [])

	useEffect(() => {
		MazeAnimation.init(this, activeMaze)
		// console.log("change active maze")
   }, [activeMaze])
       
	useEffect(() => {
		return () => {
			console.log('maze canvas did unmount')
			MazeAnimation.stop()
		}
	})

	return <div id="maze-canvas"/>;
}
export default MazeCanvas;