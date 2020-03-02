import {request} from '@/network/request'

//列表分页
export function getCollectList(page,limit){
    return request({
        url: '/collect',
        method: 'get',
        params: {
            pageNum: page,
            pageSize: limit
        }
    })
}

//列表
export function CollectList(){
    return request({
        url: '/CollectList',
        method: 'get',
    })
}

//添加
export function addCollect(data){
    return request({
        url: '/collect_add',
        method: 'post',
        data,
    })
}

//删除
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


//获得
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

//编辑
export function editCollect(data){
    return request({
        url: '/collect_edit',
        method: 'post',
        data
    })
}

//模糊查询
// export function getCollectByCondition2(page, limit,data){
    
//     return request({
//         url: '/collectByCondition?timestamp='+data.timestamp[0]+'&timestamp='+data.timestamp[1],
//         url: '/collectByCondition',
//         method: 'get',
//         params: {
//             pageNum: page,
//             pageSize: limit,
//             'name': data.name,
//             "operate": data.value,
//             "total": data.total,
//         }
//     })
// }

//模糊查询
export function getCollectByCondition(page, limit,data){
    // console.log(data.timestamp=="");
    if(data.timestamp==""||data.timestamp==null){
        return request({
            url: '/collectByCondition',
            method: 'get',
            params: {
                pageNum: page,
                pageSize: limit,
                name: data.name,
                operate: data.operate,
                total: data.total,
            }
        })
    }else{
        return request({
            url: '/collectByCondition?timestamp='+data.timestamp[0]+'&timestamp='+data.timestamp[1],
            method: 'get',
            params: {
                pageNum: page,
                pageSize: limit,
                'name': data.name,
                "operate": data.operate,
                "total": data.total,
            }
        })
    }
    
}

//导出图片
export function exportZip(collectId){
    return request({
        url: '/zipFile',
        method: 'get',
        // responseType: 'blob',
        params: {
            "collectId": collectId
        }
    })
}

//转入
export function changTo(srcCollectId,destCollectId){
    return request({
        url: '/changTo',
        method: 'get',
        params: {
            "destCollectId": destCollectId,
            "srcCollectId": srcCollectId
        }
    })
}