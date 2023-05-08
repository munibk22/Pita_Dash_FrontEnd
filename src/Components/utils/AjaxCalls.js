

// import {toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// class FetchService{
  // this.uri = uri;
  const url = "http://localhost:8080/";
  
  export const FetchService = {
  // constructor(uri){
  //   // this.url = "http://localhost:8080/";
  //   this.uri = uri;
  //   this.url = "http://localhost:8080/";
  //   console.log('Ajax request');
  // }

// GET method 
  fetchService : async(uri)=>{
    const response = await fetch(this.url+uri );
    const data = await response.json();
    console.log(data);
    return data;
  },

  // POST method 
  postData : async(uri, body) => {
    console.log(JSON.stringify(body));
    const response = await fetch((url+uri), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    success: ()=> console.log(response.status),
    error: function(){console.log(response.status)}
  });
    const data = await response.json();
    console.log(data);
    console.log(response.status);
    return {data, responseStatus:response.status};
},   

// PUT method 
 putData : async (uri, body) => {
  const response = await fetch(this.url+uri, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
},

// DELETE method 
 deleteData : async (uri, body) => {
  const response = await fetch(this.url+uri, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
},
}

// const fs = new FetchService();
// fs.fetchService("hello");
// fetchService("customer/")

// it("test_successful_fetch_request", async () => {
//  const mockData = { data: "mock data" };
//  global.fetch = jest.fn().mockImplementation(() =>
//      Promise.resolve({

//          json: () => Promise.resolve(mockData),
//      })
//  );
//  await fetchTest("valid-uri");
//  expect(global.fetch).toHaveBeenCalledTimes(1);
//  expect(global.fetch).toHaveBeenCalledWith("http://localhost:8080/valid-uri");
// });[ 'Hello from HomeController' ]

// module.exports = FetchService;