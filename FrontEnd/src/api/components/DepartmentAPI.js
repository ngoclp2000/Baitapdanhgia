import BaseAPI from '@/api/base/BaseAPI.js'

class PositionAPI extends BaseAPI {
    constructor(){
        super();
        this.controller = '/api/v1/Departments/'
    }
}

export default new PositionAPI();