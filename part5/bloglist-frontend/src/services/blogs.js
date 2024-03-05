import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blog/'
const baseUrlLogin = 'http://localhost:3003/api/login'


let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const login = async credentials => {
  const response = await axios.post(baseUrlLogin, credentials)
  return response.data
}
const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }${id}`, newObject)
  return request.then(response => response.data)
}

const dele = (id) => {
  const request = axios.delete(`${ baseUrl }${id}` )
  return request.then(response => response.data)
}

export default { getAll, login, update, create, setToken, dele }