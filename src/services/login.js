import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)

  return response.data // this is what will be received by application
}

let exportObj = { login }

export default exportObj