import BaseAPIConfig from '@/api/base/BaseAPIConfig.js'

export default class BaseApi{
    constructor(){
        this.controller = null
    }
    /**
     * Phương thức lấy tất cả dữ liệu
     * Created By TBN (21/7/2021)
     */
    getAllData(){
        return BaseAPIConfig.get(`${this.controller}`)
    }
    /**
     * Phương thức cập nhật dữ liệu lên database
     * Created By TBN (21/7/2021)
     * @param {*} id 
     * @param {*} body 
     */
    updateData(id,body){
        return BaseAPIConfig.put(`${this.controller}${id}`,body)
    }
    /**
     * Phương thức xóa dữ liệu
     * Created By TBN (21/7/2021)
     * @param {*} id 
     * @returns 
     */
    deleteData(id){
        return BaseAPIConfig.delete(`${this.controller}${id}`)
    }
    /**
     * Phương thức xóa nhiều dữ liệu
     * Created By TBN (21/7/2021)
     * @param {*} payload 
     */
    deleteMultipleData(payload){
        return BaseAPIConfig.post(`${this.controller}Delete_List`,payload)
    }
    /**
     * Phương thức thêm mới dữ liệu
     * Created By TBN (18/8/2021)
     * @param {*} payload 
     */
    createNewData(payload) {
        return BaseAPIConfig.post(`${this.controller}`,payload);
    }
    /**
     * Phương thức lấy dữ liệu theo mã code
     * Created By TBN (18/8/2021)
     * @param {*} code 
     */
    getDataByCode(code){
        return BaseAPIConfig.get(`${this.controller}code/${code}`)
    }
}