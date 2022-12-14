import { useState } from 'react'
import './Cell.css'

const Cell = ({hero, rowval, cellval, wallBoolean, activeItem, drawing}) =>  {
    const [activeColor, setActiveColor ] = useState('');

    const removeCurrent = str => {
      const elem = document.querySelector(`.${str}`)
      if (elem)elem.classList.remove(str)
    }

    const onMouseDownHandler = () => {
      if (activeItem === 'wall') {
		setActiveColor('wall')
      } else if (activeItem === 'hero') {
        removeCurrent('hero')
		setActiveColor('hero')
      } else if (activeItem === 'erase') {
		setActiveColor('')
      }
    }

    const onMouseOverHandler = e => {
      e.stopPropagation()
      if (!drawing) return
      if (activeItem === 'wall') {
        setActiveColor('wall')
      } else if (activeItem === 'erase') {
        setActiveColor('')
      }
    }
	
	const heroClass = (hero && (hero[0] === rowval && hero[1] === cellval)) ? 'hero' : ''
	const wallClass = wallBoolean ? 'wall' : ''
	return (
	<div
		rowval={rowval}
		cellval={cellval}
		className={`cell ${activeColor} ${heroClass} ${wallClass}`}
		onMouseOver={onMouseOverHandler}
		onMouseDown={onMouseDownHandler}
	/>
	)
}
export default Cell;