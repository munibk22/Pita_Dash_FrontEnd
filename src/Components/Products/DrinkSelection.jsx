import React from 'react'

const DrinkSelection = () => {
  return (
    <ul className="drink-selection " data-aos="fade-down">
    <h4 >-Drink Selection</h4>
    <li> 
    <label title='Choose Drink'>
    <input type='radio' name='drink-group' value = 'pepsi' />
    {"   "} Pepsi
   </label></li>
   <li> <label title='Choose Drink'>
   <input type='radio' name='drink-group' value='coke' />
   {"   "} Coke
   </label></li>
   <li><label title='Mountain Dew'>
    <input type='radio' name='drink-group' value='mountainDew'  />
    {"   "}Mountain Dew</label></li>
   </ul>
  )
}

export default DrinkSelection