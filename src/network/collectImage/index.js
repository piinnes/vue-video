import {request} from '@/network/request'

//采集图片列表
export function getCollectImageList(id){
    // console.log(id);
    return request({
        url: '/getCollectImageList',
        method: 'get',
        params: {
            "collectId": id
        }
    })
}

//删除图片
export function delCollectImage(id){
    return request({
        url: '/delCollectImage',
        method: 'get',
        params: {
            "imgId": id
        }
    })
}

