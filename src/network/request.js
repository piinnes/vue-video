import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:8080',
        timeout: 5000,
        headers:{
            'Content-Type':'application/json'
        }
    })

    instance.interceptors.response.use(res => {
        // console.log(res)
        return res.data
    },err => {
        console.log(err)
    })

    return instance(config)

    
}