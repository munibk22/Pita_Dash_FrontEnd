import React,{useState} from 'react'

const FriesSelection = () => {
const [selectedFries,setSelectedFries] = useState('regular');
 
const handleOptionChange = (e) => {
 setSelectedFries(e.target.value);
}
  return (
   <ul className="drink-selection " data-aos="fade-down">
   <h4 >- Fries Selection</h4>
   <li> 
   <label title='Choose Drink'>
   <input type='radio' name='fries-group' value = 'regular' 
   checked={selectedFries =='regular'} onChange={handleOptionChange} />
   
  
   {"   "} Regular
  </label></li>

  </ul>
  )
}

export default FriesSelection