import React from 'react'
import './Grid.css'
import Row from './Row'

const Grid = ({r, c, drawing, activeItem, hero, walls}) => {
    const grid = [];
    for (let i = 0; i < r; i++) {
      grid.push(
        <Row
          key={ i }
          rowval={ i }
          r={ r }
		  c={ c }
		  drawing={ drawing }
		  activeItem={ activeItem }
		  hero={ hero }
		  walls={ walls }
        />
      )
    }
    return (
      <div className="gridCont">{ grid }</div>
    )
}
export default Grid;