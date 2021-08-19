class Format {
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
    static formatTelephoneNumber(telephoneNumber) {
            if (telephoneNumber) {
                // Kiểm tra xem có phải xóa cum ") " hay không
                if(telephoneNumber.indexOf(")") == telephoneNumber.length-1){
                    return telephoneNumber.substring(0,3);
                }
                // Xóa bỏ cái dấu "()- "
                telephoneNumber = telephoneNumber.replace(/[() -]/g,'');
                // Khởi tạo số điện thoại sau khi format
                let formatTelephoneNumber = "";
                // Nếu xóa cuối cùng thì không thêm gì
                if(telephoneNumber != "")
                    formatTelephoneNumber = "(";
                // Kiểm tra xem có phải đang nhập 3 số đầu
                if(telephoneNumber.length < 3){
                  formatTelephoneNumber += telephoneNumber;
                }else if(telephoneNumber.length <= 6){
                  // Đang nhập 3 số giữa
                  formatTelephoneNumber = "(" + telephoneNumber.substring(0, 3) + ') ';
                  formatTelephoneNumber += telephoneNumber.substring(3, 6);
                }else{
                  // Đang nhập 4 số cuối
                  formatTelephoneNumber = "(" + telephoneNumber.substring(0, 3) + ') ' + 
                  telephoneNumber.substring(3, 6) + '-';
                  formatTelephoneNumber += telephoneNumber.substring(6,10);
                }
                return formatTelephoneNumber;
            }else{
                return "";
            }
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
    static formatDateImport(date) {
        if (date) {
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