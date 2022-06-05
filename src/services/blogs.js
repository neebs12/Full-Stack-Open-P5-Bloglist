import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getUserSpecificBlogs = async (user) => {
  let username = user.username
  const response = await axios.get(baseUrl)
  // then filter response.data information based on `username`
  // response.data is an array of objects
  let filteredResponse = response.data.filter(blog => {
    let specificUser = blog.user.username
    return specificUser === username
  })
  return filteredResponse
}

let exportObj = { getAll, getUserSpecificBlogs } 

export default exportObj