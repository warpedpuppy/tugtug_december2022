import { Link } from 'react-router-dom';
const Menu = () => {
	return ( 
		<nav>
			<Link to={'/'}>home</Link>
			<Link to={'/admin'}>admin</Link>
		</nav>
	 );
}
 
export default Menu;