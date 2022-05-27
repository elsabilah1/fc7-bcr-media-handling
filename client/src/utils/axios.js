import axios from 'axios'

const config = {
  baseUrl: 'https://625e8357873d6798e2a8ebdb.mockapi.io/api',
}

const _axios = axios.create({
  baseURL: config.baseUrl,
})

_axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    console.log(error, 'error')
  }
)

_axios.interceptors.response.use(
  function (response) {
    response = response.data !== undefined ? response.data : response
    return response
  },
  function (error) {
    console.log(error, 'error')
  }
)

const header = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
  }
}

const errors = (errors) => {
  return {
    status: false,
    error: errors,
  }
}

export const Get = async (url) => {
  try {
    const head = header()
    const res = await _axios.get(url, head)
    return res
  } catch (error) {
    return errors(error.message)
  }
}

export const Delete = async (url) => {
  try {
    const head = header()
    const res = await _axios.delete(url, head)
    return res
  } catch (error) {
    return errors(error.message)
  }
}
