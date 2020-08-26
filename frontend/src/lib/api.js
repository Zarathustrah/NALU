import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'
const lat = 
const long = 

const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

const withMarineHeaders = () => {
  return {
    headers: { Authorization: process.env.REACT_APP_STORM }
  }
}

// -------------------------------- Spot Related  -------------------------------- //

export const getAllSpots = () => {
  return axios.get(`${baseUrl}/surfspots`)
}

export const showSingleSpot = id => {
  return axios.get(`${baseUrl}/surfspots/${id}`)
}

export const createSpot = formData => {
  return axios.post(`${baseUrl}/surfspots`, formData, withHeaders())
}

export const editSpot = (id, formData) => {
  return axios.put(`${baseUrl}/surfspots/${id}`, formData, withHeaders())
} 

export const deleteSpot = id => {
  return axios.delete(`${baseUrl}/surfspots/${id}`, withHeaders())
}

// -------------------------------- Spot Related  -------------------------------- //

export const commentSpot = (id, formData) => {
  return axios.post(`${baseUrl}/surfspots/${id}/comments`, formData, withHeaders())
}

export const deleteSpotComment = (id, commentId) => {
  return axios.delete(`${baseUrl}/surfspots/${id}/comments/${commentId}`, withHeaders())
}

// -------------------------------- User Registration  -------------------------------- //

export const registerUser = formData => {
  console.log(formData, baseUrl)
  return axios.post(`${baseUrl}/register`, formData)
}

export const loginUser = formData => {
  return axios.post(`${baseUrl}/login`, formData )
}

// --------------------------------  Profiles Related  -------------------------------- //

export const getAllUsers = () => {
  return axios.get(`${baseUrl}/profiles`, withHeaders())
}

export const getUser = userId => {
  return axios.get(`${baseUrl}/profiles/${userId}`, withHeaders())
}

export const editUser = (userId, formData) => {
  return axios.put(`${baseUrl}/profiles/${userId}`, formData, withHeaders())
}

// -------------------------------- External API Related  -------------------------------- //
export const getMarineWeatherStatus = () => {
  return axios.get(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${long}&params=airTemperature,seaLevel,swellDirection,swellHeight,waterTemperature,waveDirection,waveHeight`, withMarineHeaders())
}


export const getLocalWeatherStatus = () => {
  return axios.get(`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_WEATHER_KEY}`)
}

