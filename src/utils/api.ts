import Axios from 'axios'

const token = localStorage.getItem('token')

export const Api = () => {
  let baseUrl = 'http://localhost:5000/api'
  const APi = Axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  })

  APi.interceptors.response.use(
    (succes) => succes,
    (err) => {
      if (err.response && err.response.data) {
        if (
          err.response.status === 401 &&
          document.location.pathname !== '/'
        ) {
          localStorage.clear()
          document.location.pathname = '/'
        }
        throw { ...err.response.data, code: err.response.status }
      }
      throw err
    }
  )

  return APi
}
