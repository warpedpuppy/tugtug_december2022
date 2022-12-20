import { useEffect } from 'react';
import './MazeCanvas.css';
import MazeAnimation from '../animations/maze-animation';

const MazeCanvas = ({activeMaze}) => {

    useEffect(() => {
		//  MazeAnimation.init(this, activeMaze)
	}, [])

	useEffect(() => {
		MazeAnimation.init(activeMaze)
		// console.log("change active maze")
   }, [activeMaze])
       
	useEffect(() => {
		return () => {
			MazeAnimation.stop()
		}
	})

	return <div id="maze-canvas"/>;
}
export default MazeCanvas;