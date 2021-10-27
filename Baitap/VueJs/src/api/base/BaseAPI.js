import BaseAPIConfig from '@/api/base/BaseAPIConfig.js'

export default class BaseApi{
    constructor(){
        this.controller = null
    }
    /**
     * Phương thức lấy tất cả dữ liệu
     */
    getAllData(){
        return BaseAPIConfig.get(`${this.controller}`)
    }
    /**
     * Phương thức cập nhật dữ liệu lên database
     * @param {*} id 
     * @param {*} body 
     */
    updateData(id,body){
        return BaseAPIConfig.put(`${this.controller}${id}`,body)
    }
    /**
     * Phương thức xóa dữ liệu
     * @param {*} id 
     * @returns 
     */
    deleteData(id){
        return BaseAPIConfig.delete(`${this.controller}${id}`)
    }
    /**
     * 
     * @param {*} payload 
     */
    createNewData(payload) {
        return BaseAPIConfig.post(`${this.controller}`,payload);
    }
}