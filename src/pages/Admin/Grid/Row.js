import React from 'react'
import Cell from './Cell'
import './Row.css'

const Row = ({ walls, c, rowval, drawing, activeItem, hero }) => {

  const wallString = JSON.stringify(walls)
  const row = []
  for (let i = 0; i < c; i ++) {
    const temp = JSON.stringify([rowval, i])
    const wallBoolean = (wallString) ? wallString.includes(temp) : false
    row.push(<Cell
      cellval={i}
      key={i}
      wallBoolean={wallBoolean}
      walls={walls}
	  hero={hero}
	  c={c}
	  rowval={rowval}
	  drawing={drawing}
	  activeItem={activeItem}
    />)
  }
  return <div className="maze-row">{ row }</div>

}
export default Row;