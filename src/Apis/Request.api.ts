import axios from 'axios'

// const baseURL = `http://localhost:3000/`
const baseURL = `https://nexus-server-dam7.onrender.com/`

export const request = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

request.interceptors.request.use(
  (response) => {
    const token = localStorage.getItem('nexus-token')

    response.headers['Authorization'] = `Bearer ${token}`

    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshResponse = await axios.post(
          `${baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        )

        const newToken = refreshResponse.data.token

        localStorage.setItem('nexus-token', newToken)

        originalRequest.headers['Authorization'] = `Bearer ${newToken}`

        return request(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('token')
      }
    }

    return Promise.reject(error)
  }
)
