import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


// const getAll = () => {
//     const request = axios
//     .get(baseUrl)
//     .then(response => {       
//         console.log(response.data) 
//            })
//     .catch((err)=> console.log(err))
//    console.log(request) 
//     return request
//   }
  const getAll = async () => {
    const request = await  fetch(baseUrl)
    const res = await request.json()
       console.log(res) 
    return res
  }
  const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
  
  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }
  
  export default { getAll, create, update }