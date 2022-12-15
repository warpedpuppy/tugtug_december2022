import MazeCanvas from '../components/MazeCanvas';

const Home = ({activeMaze}) => {

	return (
	<>
	<h1>activeMaze: {activeMaze?.id} </h1>
	<MazeCanvas activeMaze={activeMaze}/>
	</>
	);
}
 
export default Home;