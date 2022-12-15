import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Menu from './components/Menu';
import DefaultMaze from './defaults/DefaultMaze';
function App() {
  const [ activeMaze, setActiveMaze ] = useState(DefaultMaze)
  return (
    <BrowserRouter>
	<Menu />
	<Routes>
		<Route index element={ <Home activeMaze={activeMaze} /> } />
		<Route path='admin/*' element={ <Admin setActiveMaze={setActiveMaze} /> } />
		<Route path='*' element={ <NotFound /> } />
	</Routes>
	</BrowserRouter>
  );
}

export default App;
