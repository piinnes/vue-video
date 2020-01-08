import {request} from '@/network/request'

export function getCollectList(){
    return request({
        url: '/collect',
        method: 'get'
    })
}

export function addCollect(data){
    return request({
        url: '/collect_add',
        method: 'post',
        data,
    })
}

export function deleteCollect(id){
    // console.log(id)
    return request({
        url: '/collect_del',
        method: 'get',
        params: {
            'id': id
        },
    })
}

export function getCollect(id){
    return request({
        url: '/collect_getInfo',
        method: 'get',
        params: {
            'id': id
        },
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}

export function editCollect(data){
    return request({
        url: '/collect_edit',
        method: 'post',
        data
    })
}

export function getCollectByLikeName(data){
    return request({
        url: '/collect_like_name',
        method: 'get',
        params: {
            'likeName': data
        }
    })
}