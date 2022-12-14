import { useState } from 'react';
import './NewGrid.css';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import nextId from 'react-id-generator';
import Select from './Select';
import MazeService from '../../../services/maze-service';
import Grid from './Grid';

const NewGrid = ({addMaze, loggedIn}) =>  {

	const [ rows, setRows ] = useState(20);
	const [ cols, setCols ] = useState(20);
	const [ activeItem, setActiveItem ] = useState('hero');
	const [ drawing, setDrawing ] = useState(false);
	const [ feedback, setFeedback ] = useState('');

    const changeSize = (dimension, number) => {
      if (dimension === 'rows') {
        setRows(number)
      } else {
        setCols(number)
      }
    }

    const addItem = (x, activeItem) => {
		setActiveItem(activeItem)
    }

    const onMouseDownHandler = () => {
		setDrawing(true);
		setFeedback('')
    }

    const onMouseUpHandler = e => {
      e.stopPropagation()
      setDrawing(false);
    }

    const clearMaze = () => {
      const elems = document.querySelectorAll('.newGrid .cell')
      elems.forEach( node => {
        node.classList.remove('hero')
        node.classList.remove('wall')
      })
    }

    const createObject = () => {
      const cells = document.querySelectorAll('.newGrid .cell')
      const obj = {}
      const walls = []

      cells.forEach((node) => {
        const row = node.getAttribute('rowval')
        const cell = node.getAttribute('cellval')
        const className = node.getAttribute('class')
        if (className.includes('hero') ) {
          obj['hero'] = [parseInt(row, 10), parseInt(cell, 10)]
        } else if (className.includes('wall')) {
          walls.push([parseInt(row, 10), parseInt(cell, 10)])
        }
      })
      obj.walls = walls
      obj.c = cols
      obj.r = rows

      return obj
    }

    const saveMazeHandler = async () => {

	setFeedback('')
      const obj = createObject()


      if (obj.hero) {
        let res = await MazeService.saveMaze(obj)

		if (res.success) {
			clearMaze();
			addMaze(obj);
			setFeedback(<Alert variant="success">maze entered!</Alert>)
		}

      } else {
		setFeedback(<Alert variant="warning">you need to have a hero!</Alert>)
      }
    }

    const tempSaveMazeHandler = () => {
      setFeedback('')

      const obj = createObject()
      obj.id = nextId()

      if (obj.hero) {
		obj.temp = true;
		addMaze(obj);
        clearMaze()
        setFeedback(<Alert variant="success">temp maze entered!</Alert>)
      } else {
        setFeedback(<Alert variant="warning">you need to have a hero!</Alert>)
      }
    }
 


       
      return (
        <div>
		{ loggedIn && <Button variant="success" onClick={saveMazeHandler}>save maze</Button>}
        <Button variant="success" onClick={tempSaveMazeHandler}>save temporary maze</Button>
          <fieldset>
            <legend>build a new grid</legend>
            <Select
              title="rows"
              changeSize={changeSize}
              currentValue={rows.toString()}
              array={Array.from(Array(51).keys()).splice(rows)}
            />
            <Select
              title="cols"
              changeSize={changeSize}
              currentValue={cols.toString()}
              array={Array.from(Array(51).keys()).splice(cols)}
            />
            <Select
              title="place"
              changeSize={addItem}
              currentValue={activeItem}
              array={['wall', 'hero', 'erase']}
            />
           
          </fieldset>
          { feedback}
          <hr />
          <div onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} className="grid newGrid">
            <Grid r={rows} c={cols} drawing={drawing} activeItem={activeItem} />
          </div>
        </div>

      )
    
}
export default NewGrid;
