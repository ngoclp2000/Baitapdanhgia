class Format{
    /**
     * Hàm định dạng tiền tệ
     * Created By TBN
     * @param {*} money 
     * @returns 
     */
     static formatMoney(money) {
        if (money) {
            return money.toString().replaceAll('.', '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        } else return "0";
    }
    /**
     * Hàm định dạng ngày tháng => day/month/year
     * Created By TBN
     * @param {*} date 
     * @returns 
     */
    static formatDate(date) {
        if (date) {
            let _date = new Date(date);
            let day = _date.getDate(),
                month = _date.getMonth() + 1,
                year = _date.getFullYear();
            day = day < 10 ? '0' + day : day;
            month = month < 10 ? '0' + month : month;
            return day + '/' + month + '/' + year;
        } else return "";
    }
    static formatDateImport(date){
        if(date){
            let parts = date.split(" ");
            console.log(parts)
        }
    }
    /**
     * Hàm chuyển về số (Dùng cho trường tiền tệ)
     * Created By TBN
     * @param {*} number 
     * @returns 
     */
    static changeToNumber(number) {
        if (number) {
            return number.replaceAll('.', '');
        } else return "0"
    }
}

export default Format