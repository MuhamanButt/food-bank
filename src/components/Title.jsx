import React from 'react'
import './styling/Title.css'
import HrTag from './HrTag'

const Title = ({name}) => {
  return (
    <div className='row container-fluid mt-2'>
      <div className="col-auto">
        <h3 className='head'>{name}</h3>
        <br />
      </div>
      <div className="col">
        <HrTag></HrTag>
      </div>
    </div>
  )
}

export default Title
