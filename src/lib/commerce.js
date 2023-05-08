import Commerce from '@chec/commerce.js';


export const commerceService = new Commerce(process.env.REACT_APP_PUBLIC_API_KEY
 ,true);