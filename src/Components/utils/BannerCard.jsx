import React from 'react';

const BannerCard = () => {
const handleClick = () =>{
 console.log('hello');
}
return (
<>
<div className="card-banner-body box-shadow2"> 
      <div className="card-background"></div>

      {/* <!-- Free Card Plan --> */}
      <article className="card-banner primary">
        <h2>Shop Clothes</h2>
        <var>
          <abbr>$</abbr>99 <small>/MO</small>
        </var>
          <ul>
            <li>
              <img src="" alt="checkmark" />
           <p>10 user request</p>
            </li>
            {/* <!-- More Features --> */}
          </ul>
       <button onClick={handleClick}>Shop Now</button>
      </article>
      </div>

</>

);
}

export default BannerCard;