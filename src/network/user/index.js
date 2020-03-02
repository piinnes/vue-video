import {request} from '@/network/request'

export function login(data) {
//   console.log(data)
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/getInfo',
    method: 'get',
    params: { "token":token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function register(username, password) {
  return request({
    url: '/register',
    method: 'get',
    params: {
      username: username,
      password: password
    }
  })
}

export function forget(username, password) {
  return request({
    url: '/forget',
    method: 'get',
    params: {
      username: username,
      password: password
    }
  })
}