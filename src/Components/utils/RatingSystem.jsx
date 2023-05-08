import React from 'react'

const RatingSystem = ({rating}) => {
const stars = [];

for(i =0 ; i < 5; i++){
 if(i < rating)
 stars.push(`<i key={i} className='fa-star'></i>`)
}else
stars.push(`<i key={i} className='fa-circle'></i>`))

  return (
    <div>RatingSystem</div>
  )
}

export default RatingSystem