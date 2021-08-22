import BaseAPI from '@/api/base/BaseAPI.js'

class PositionAPI extends BaseAPI {
    constructor(){
        super();
        this.controller = 'api/v1/Positions/'
    }
}

export default new PositionAPI();