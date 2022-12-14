import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Menu from './components/Menu';

function App() {
  return (
    <BrowserRouter>
	<Menu />
	<Routes>
		<Route index element={ <Home /> } />
		<Route path='admin/*' element={ <Admin /> } />
		<Route path='*' element={ <NotFound /> } />
	</Routes>
	</BrowserRouter>
  );
}

export default App;
