import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 10000
})
export const post = (url, data = {}) => {
  return new Promise((res, rej) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      res(response.data)
    }, err => {
      rej(err)
    })
  })
}
export const get = (url, params = {}) => {
  return new Promise((res, rej) => {
    instance.get(url, { params }).then((response) => {
      res(response.data)
    }, err => {
      rej(err)
    })
  })
}