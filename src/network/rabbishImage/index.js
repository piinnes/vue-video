import {request} from '@/network/request'

export function getRabbishImageList(id){
    return request({
        url: '/getRabbishImageList',
        method: 'get',
        params: {
            "id": id
        }
    })
}

export function delRabbishImage(id){
    return request({
        url: '/delRabbishImage',
        method: 'get',
        params: {
            "imgId": id
        }
    })
}

