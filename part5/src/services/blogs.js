import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.post(baseUrl, newObject, config)
  return request.data
}

const blogService = { getAll, createNew, setToken }

export default blogService