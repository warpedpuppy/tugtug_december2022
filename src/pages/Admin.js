import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import NewGrid from './Admin/createGrid/NewGrid'
import AllGrids from './Admin/AllMazes/AllGrids'
import AdminHome from './Admin/AdminHome'
import Login from './Admin/Login'
import './Admin.css'
import MazeService from '../services/maze-service'
import TokenService from '../services/token-service'
// import SiteContext from '../SiteContext'


export default class LoggedIn extends React.Component {

  state = {mazes:[], loggedIn: false}

  addMaze = (maze) => {
	this.setState({mazes: [...this.state.mazes, maze]})
  }

  deleteMaze = (index) => {
	let mazes = [...this.state.mazes];

	mazes.splice(index, 1)

	this.setState({mazes})
  }

  async componentDidMount () {
	
	let mazes = await MazeService.loadAllMazes()
	this.setState({mazes})

	if (TokenService.getAuthToken()) {
		this.setState({loggedIn: true})
	}
  }

  loginHandler = () => {
	this.setState({loggedIn: true})
  }
  logOutHandler = () => {
	this.setState({loggedIn: false})
  }

  render () {
	const { mazes, loggedIn } = this.state;
      return (
        <div className="general-page-layout">
          <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="Home">
              <AdminHome />
            </Tab>
            <Tab eventKey="new-grid" title="new grid">
              <NewGrid addMaze={ this.addMaze } loggedIn={loggedIn} />
            </Tab>
            <Tab eventKey="all-grids" title="all grids">
              <AllGrids mazes={ mazes } deleteMaze={ this.deleteMaze }/>
            </Tab>
            <Tab eventKey="admin" title="admin's admin">
              <Login loginHandler={this.loginHandler} loggedIn={loggedIn} logOutHandler={this.logOutHandler}/>
            </Tab>
          </Tabs>
        </div>
      )
    
  }
}
