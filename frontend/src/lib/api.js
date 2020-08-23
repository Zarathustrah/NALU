import axios from 'axios'

const baseUrl = 'https://localhost:7000/api'

export const getAllSpots = () => {
  return axios.get(`${baseUrl}/surfspots`)
}

export const registerUser = formData => {
  return axios.post(`${baseUrl}/register`, formData)
}


export const loginUser = formData => {
  return axios.post(`{baseURL}/login`, formData )
}


