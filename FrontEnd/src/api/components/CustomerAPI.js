import BaseAPI from '@/api/base/BaseAPI.js'
import BaseAPIConfig from '@/api/base/BaseAPIConfig.js'
class CustomerAPI extends BaseAPI {
    constructor(){
        super();
        this.BaseAPIConfig = BaseAPIConfig
        this.controller = 'api/v1/Customers/'
    }
    /**
     * Phương thức lấy mã khách hàng mới nhất
     * Created By TBN (28/7/2021)
     */
    async getNewCustomerCode() {
        return await this.BaseAPIConfig.get(`${this.controller}NewCustomercode`)
    }
    /**
     * Phương thức lọc dữ liệu khách hàng theo các tiêu chí
     * @param {*} params 
     */
    async filterCustomers(params) {
        let passParams = Object.assign({}, params)
        passParams['customerFilter'] = passParams["contentFilter"]
        delete passParams.contentFilter
        return await this.BaseAPIConfig.get(`${this.controller}CustomersFilter`,{ params :passParams})
    }
}

export default new CustomerAPI();