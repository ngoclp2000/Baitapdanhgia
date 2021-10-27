import BaseAPI from '@/api/base/BaseAPI.js'

class CustomerGroupAPI extends BaseAPI {
    constructor(){
        super();
        this.controller = '/api/v1/CustomerGroups/'
    }
}

export default new CustomerGroupAPI();