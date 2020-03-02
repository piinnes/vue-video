import {request} from '@/network/request'

export function upload(data){
    return request({
        url: '/upload',
        method: 'post',
        data
    })
}