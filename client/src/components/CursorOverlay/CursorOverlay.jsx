import React from 'react'
import cursor from '../../resources/icons/selection.svg';
import { useSelector } from 'react-redux'
const CursorOverlay = () => {
  const cursors = useSelector((state) => state.cursor.cursors);
  return (
    <>
      {cursors.map(c => (
        <div className='cursor' style={{ position: 'absolute', left: c.x, top: c.y, width: "30px" }}>
          <img src={cursor} key={c.userId} className='cursor' style={{ width: "30px" }} />
          <>{c.userId}</>
        </div>

      ))}
    </>
  )
}

export default CursorOverlay

