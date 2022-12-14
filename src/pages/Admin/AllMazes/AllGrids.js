import React from 'react'
import MazeService from '../../../services/maze-service'
import DisplayMaze from './DisplayMaze'
import './AllGrids.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default class AllGrids extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false,
      idToDelete: undefined,
	  mazeToDelete: undefined
    }
  }

    componentDidMount () {
    //   this.loadMazes()
    }

    handleClose = () => this.setState({ show: false });

    handleShow = (id) => {
      this.setState({ show: true, idToDelete: id })
    };

    deleteMazeHandler = (maze) => {
		this.props.deleteMaze(this.state.mazeToDelete)
		this.handleClose();
    //   MazeService.deleteMaze(this.state.idToDelete)
    //     .then((data) => {
    //       console.log(data)
    //     })
    //   this.setState({ show: false, idToDelete: undefined })
    }

	triggerModal = (id) => {
		this.handleShow();
		this.setState({mazeToDelete: id})
	}

	cancelModal = () => {
		this.handleClose();
		this.setState({mazeToDelete: undefined})
	}

    render () {

          return (
          <>
            <div className="all-grids">
              {
				
                this.props.mazes.map((mazeObject, index) => {
						console.log(mazeObject)
					return (
                  <DisplayMaze
                    key={index}
                    deleteMaze={() => this.triggerModal(index)}
                    {...mazeObject}
                  />
                )})
              }
            </div>
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Maze Deleterizer</Modal.Title>
              </Modal.Header>
              <Modal.Body>You are sure you want to delete?</Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={this.deleteMazeHandler}>
                      confirm delete
                </Button>
                <Button variant="warning" onClick={this.cancelModal}>
                      cancel delete
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )
    
      
    }
}
