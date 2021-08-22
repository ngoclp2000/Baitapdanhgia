class Common {
    /**
     * Chuyển locale của browser về chung một dạng
     * Created By TBN (22/8/2021)
     * @param {} string 
     * @returns 
     */
    static convertBrowserLocale(string){
        if(Array.isArray(string)){
            string = string[0].toLowerCase();
        }else
            string = string.toLowerCase();
        switch(string){
            case 'vi-vn':
                return 'vi';
            case 'en':
            case 'en-us':
            case 'en-in':
            case 'en-gb':
                return 'en';
        }
    }
    /**
     * Sắp xếp theo trường dữ liệu phụ thuộc vào kiểu dữ liệu và chiều sắp xếp
     * Created By TBN (22/8/2021)
     * @param {*} array 
     * @param {*} fieldName 
     * @param {*} direction 
     * @param {*} type 
     * @returns 
     */
    static sortByFieldName(array, fieldName, direction, type) {
        return array.sort((a, b) => {
            if (a[fieldName] == null && b[fieldName] == null) {
                return 0;
            } else {
                // Kiểm tra chiều sắp xếp là tăng dần hay giảm dần
                if (a[fieldName] == null) {
                    return (!direction ? -1 : 1);
                } else if (b[fieldName] == null) {
                    return (!direction ? 1 : -1);
                } else {
                    let convertValueA = this.convertData(fieldName, a[fieldName]);
                    let convertValueB = this.convertData(fieldName, b[fieldName]);
                    if (type == 'number') {
                        // Lấy số ra khỏi chuỗi
                        convertValueA = parseInt(convertValueA.toString().replaceAll(/^\D+/g, ''), 10) || 0;
                        convertValueB = parseInt(convertValueB.toString().replaceAll(/^\D+/g, ''), 10) || 0;
                        
                        if (convertValueA > convertValueB) {
                            return (!direction ? 1 : -1);
                        } else if (convertValueA < convertValueB) {
                            return (!direction ? -1 : 1);
                        } else
                            return 0;
                    } else {
                        return (!direction ? convertValueA.localeCompare(convertValueB) : convertValueB.localeCompare(convertValueA));
                    }
                }
            }
        });
        // }
    }
    /**
     * Format dữ liệu nếu cần thiết
     * @param {*} fieldName 
     * @param {*} data 
     * @returns 
     */
    static convertData(fieldName, data) {
        return data;
    }
}

export default Common;