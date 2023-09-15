import React from 'react'
import "./styling/ImageCard.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState,useEffect } from 'react';
import { useFirebase } from '../context/firebase';

const ImageCard = ({imageSRC,heading,description,viewHandler,imageURL,identity}) => {
  const [URL, setURL] = useState(null);
  const firebase=useFirebase();
  useEffect(()=>{
    if(imageSRC==undefined)
    {
      firebase.getImageURL(imageURL)
      .then(URL=>setURL(URL))
    }
    else
    {
      setURL(imageSRC)
    }
  },[])
  
  return (
    <div className='col-10 col-sm-5 col-md-3 imageCard'>
     <Card>
      <Card.Img variant="top" src={URL} className='imageCard-img'/>
      <Card.Body>
        <Card.Title className='imageCard-heading'>{heading}</Card.Title>
        <Card.Text className='imageCard-description'>
          {description}
        </Card.Text>
        <Button className='imageCard-button' onClick={viewHandler}>View</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default ImageCard
