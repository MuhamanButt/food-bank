import React from 'react'
import './styling/ReviewBar.css';

const ReviewBar = ({handler}) => {

  return (
    <div className='row'>
      <div className="col">
      <div className="rate">
        <input type="radio" name="rate" value="5" />
        <label htmlFor="star5" title="text"onClick={()=>handler(5)} >5 stars</label>
        <input type="radio" name="rate" value="4" />
        <label htmlFor="star4" title="text"onClick={()=>handler(4)}>4 stars</label>
        <input type="radio" name="rate" value="3" />
        <label htmlFor="star3" title="text"onClick={()=>handler(3)}>3 stars</label>
        <input type="radio" name="rate" value="2" />
        <label htmlFor="star2" title="text"onClick={()=>handler(2)}>2 stars</label>
        <input type="radio" name="rate" value="1" />
        <label htmlFor="star1" title="text"onClick={()=>handler(1)}>1 star</label>
    </div>
      </div>
    </div>

  )
}

export default ReviewBar
