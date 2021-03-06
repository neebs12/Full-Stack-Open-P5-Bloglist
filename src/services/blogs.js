import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (user) => {
  token = `bearer ${user.token}`
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

const addNewBlog = async (blog) => {
  const config = {
    headers: { // remember this!
      'Content-Type': 'application/json',
      Authorization: token
    }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const updateABlog = async (id, blog) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  }
  const response = await axios.put(`${baseUrl}/${id}`, blog, config)
  return response.data
}

const deleteABlog = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

let exportObj = {
  getAll,
  setToken,
  getUserSpecificBlogs,
  addNewBlog,
  updateABlog,
  deleteABlog
}

export default exportObj