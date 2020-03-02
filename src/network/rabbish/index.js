import {request} from '@/network/request'

export function getRabbishList(page,limit){
    return request({
        url: '/rabbish_category_list',
        method: 'get',
        params: {
            pageNum: page,
            pageSize: limit
        }
    })
}

//模糊查询
export function getRubbishByCondition(page, limit,data){
    // console.log(data.timestamp=="");
        return request({
            url: '/rubbishByCondition',
            method: 'get',
            params: {
                pageNum: page,
                pageSize: limit,
                name: data.name,
                operate: data.operate,
                total: data.total,
            }
        })
}

export function rabbishList(){
    return request({
        url: '/rabbishList',
        method: 'get',
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

//导出图片
export function exportZip(rabbishId){
    return request({
        url: '/zipFile',
        method: 'get',
        // responseType: 'blob',
        params: {
            "rabbishId": rabbishId
        }
    })
}