import React from 'react'
import './Grid.css'
import Row from './Row'

const Grid = ({r, c, drawing, activeItem}) => {
    const grid = [];
    for (let i = 0; i < r; i++) {
      grid.push(
        <Row
          key={i}
          rowval={i}
          r={r}
		  c={c}
		  drawing={drawing}
		  activeItem={activeItem}
        />
      )
    }
    return (
      <div className="gridCont">{ grid }</div>
    )
}
export default Grid;