import axios from 'axios'

const token = localStorage.getItem('nexus-token')

export const request = axios.create({
  baseURL: `https://nexus-server-dam7.onrender.com/`,
  headers: { Authorization: `Bearer ${token}` }
})
