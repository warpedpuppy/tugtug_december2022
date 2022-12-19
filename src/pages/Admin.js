import NewGrid from './Admin/createGrid/NewGrid';
import AllGrids from './Admin/AllMazes/AllGrids';
import AdminHome from './Admin/AdminHome';
import Login from './Admin/Login';
import './Admin.css';
import MazeService from '../services/maze-service';
import TokenService from '../services/token-service';
import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Admin = ({setActiveMaze}) => {

	const [ mazes, setMazes ] = useState([]);
	const [ loggedIn, setLoggedIn ] = useState(false);

	useEffect(() => {
		loadMazes();
		if (TokenService.getAuthToken()) setLoggedIn(true);
	}, [])

	const addMaze = maze => {
		setMazes([maze,  ...mazes]);
	}

	const deleteMaze = index => {
		let temp = [...mazes];
		temp.splice(index, 1)
		setMazes(temp);
		if (!mazes[index].temp) MazeService.deleteMaze(index);
	}

	const loadMazes = async () => {
		let mazes = await MazeService.loadAllMazes();
		// console('active maze = ', mazes[0])
		setActiveMaze(mazes[0]);
		setMazes(mazes);
	}

	const loginHandler = () => {
		setLoggedIn(true);
	}
	const logOutHandler = () => {
		setLoggedIn(false);
	}

	return (
		<div className="general-page-layout">
			<Link to={'new-maze'}>new maze</Link>
			<Link to={'all-mazes'}>all mazes</Link>
			<Link to={'admin-login'}>admin login</Link>
			<Routes>
				<Route index element={<AdminHome />} />
				<Route path='new-maze' element={ <NewGrid addMaze={ addMaze } loggedIn={loggedIn} /> } />
				<Route path='all-mazes' element={ <AllGrids mazes={ mazes } deleteMaze={ deleteMaze } /> } />
				<Route path='admin-login' element={ <Login loginHandler={loginHandler} loggedIn={loggedIn} logOutHandler={logOutHandler}/> } />
				<Route path='*' element={ <h1>not found</h1> } />
			</Routes>
		</div>
	)
}
export default Admin;