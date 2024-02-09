import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";
// const baseUrl = "https://one234-sola.onrender.com/api/persons";


const getAll = () => {
  const request = axios.get(baseUrl);
  return request
  // .then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request
  // .then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request
  // .then((response) => response.data);
};

const del = (ol) => {
  const request = axios.delete(`${baseUrl}/${ol}`);
  return request
  // .then((response) => response.data);
};

export default { getAll, create, update, del };


// {
//   "persons":[
//     { 
//       "name": "Arto Hellas", 
//       "number": "040-123456",
//       "id": 0
//     },
//     { 
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523",
//       "id": 1
//     },
//     { 
//       "name": "Dan Abramov", 
//       "number": "12-43-234345",
//       "id": 2
//     },
//     { 
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122",
//       "id": 3
//     }
//   ]
// }