import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blog/'
const baseUrlLogin = 'http://localhost:3003/api/login'
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const login = async credentials => {
  const response = await axios.post(baseUrlLogin, credentials)
  return response.data
}


export default { getAll, login }