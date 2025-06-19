import axios from 'axios'

const token = localStorage.getItem('nexus-token')

export const request = axios.create({
  // baseURL: `http://localhost:3000/`,
  baseURL: `https://nexus-server-dam7.onrender.com/`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
})

request.interceptors.request.use((config) => {
  console.log('Axios sending data:', config.data)
  return config
})
