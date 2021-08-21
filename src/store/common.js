class Common {

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
                        convertValueA = parseInt(convertValueA.toString().replaceAll(/^\D+/g, ''), 10);
                        convertValueB = parseInt(convertValueB.toString().replaceAll(/^\D+/g, ''), 10);

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
    /**
     * Hiển thị tooltip
     * Created By TBN (3/8/2021)
     */
    static showTooltip($event,isUp) {
        $event.target.querySelector('.tooltip').classList.add("show-flex");
        let positionX = $event.screenX; // Vị trí x con trỏ theo screenview
        let positionY = $event.clientY; // Vị trí y con trỏ theo clientview
        let width = $event.target.offsetWidth; // Chiều dài của element đang trỏ tới
        let height = $event.target.offsetHeight; // Chiều rộng của element đang trỏ tới
        let tooltip = $event.target.querySelector('.tooltip');
        if(isUp){
            tooltip.style.left = (positionX + 10) + "px"
            tooltip.style.top = (positionY - 50) + "px"
        }else{
            tooltip.style.left = (positionX - width / 2 - 5) + "px"
            tooltip.style.top = (positionY + 25) + "px"
        }
        tooltip.style.height = height + "px"
        
    }
    /**
     * Ẩn tool tip
     * Created By TBN (3/8/2021)
     */
    static hideTooltip($event) {
        $event.target.querySelector('.tooltip').classList.remove("show-flex");
    }
}

export default Common;