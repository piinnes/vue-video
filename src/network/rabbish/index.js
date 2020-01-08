import {request} from '@/network/request'

export function getRabbishList(){
    return request({
        url: '/rabbish_category_list',
        method: 'get'
    })
}

export function addRabbish(data){
    return request({
        url: '/rabbish_category_add',
        method: 'post',
        data,
    })
}

export function deleteRabbish(data){
    return request({
        url: '/rabbish_category_del',
        method: 'post',
        data
    })
}

export function getRabbish(id){
    return request({
        url: '/rabbish_category_getInfo',
        method: 'get',
        params: {
            'id': id
        },
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}

export function editRabbish(data){
    return request({
        url: '/rabbish_category_edit',
        method: 'post',
        data
    })
}

export function getRabbishByLikeName(data){
    return request({
        url: '/rabbish_category_like_name',
        method: 'get',
        params: {
            'likeName': data
        }
    })
}