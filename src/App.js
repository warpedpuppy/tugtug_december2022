import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Menu from './components/Menu';
// import 'bootstrap/dist/css/bootstrap.min.css';
function App() {




  return (
    <BrowserRouter>
	<Menu />
	<Routes>
		<Route path='/' element={ <Home /> } />
		<Route path='/admin' element={ <Admin /> } />
		<Route path='*' element={ <NotFound /> } />
	</Routes>
	</BrowserRouter>
  );
}

export default App;
