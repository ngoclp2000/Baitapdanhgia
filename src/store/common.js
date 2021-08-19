class Common {
    static cloneArray(source) {
        let res = []
        for (let i = 0; i < source.length; i++) {
            res.push(source[i]);
        }
        return res;
    }
    static shuffleFisherYates(array) {
        let i = array.length;
        while (i--) {
            const ri = Math.floor(Math.random() * i);
            [array[i], array[ri]] = [array[ri], array[i]];
        }
        return array;
    }
    static sortByFieldName(array, fieldName, direction, type) {
        // if (type == 'number') {
        //     console.log(direction);
        // } else {
        return array.sort((a, b) => {
            if (a[fieldName] == null && b[fieldName] == null) {
                return 0;
            } else {
                if (a[fieldName] == null) {
                    return (!direction ? -1 : 1);
                } else if (b[fieldName] == null) {
                    return (!direction ? 1 : -1);
                } else {
                    let convertValueA = this.convertData(fieldName, a[fieldName]);
                    let convertValueB = this.convertData(fieldName, b[fieldName]);
                    if (type == 'number') {
                        // Lấy số ra khỏi chuỗi
                        convertValueA = parseInt(convertValueA.toString().replaceAll( /^\D+/g, ''),10);
                        convertValueB = parseInt(convertValueB.toString().replaceAll( /^\D+/g, ''),10);
                        
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
    static convertData(fieldName, data) {
        if (fieldName == "WorkStatus") {
            switch (data) {
                case 1:
                    data = "Đang làm việc"
                    break;
                case 2:
                    data = "Đã nghỉ việc"
                    break;
                default:
                    data = "Không xác định"
            }
        }
        return data;
    }
}

export default Common;