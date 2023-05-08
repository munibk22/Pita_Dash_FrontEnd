import React from 'react';

const RatingSystem = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className="fa fa-star gold"></i>);
    } else {
      stars.push(<i key={i} className="fa fa-star-o"></i>);
    }
  }

  return (
    <div className="rating-system">
      {stars}
    </div>
  );
};

export default RatingSystem;