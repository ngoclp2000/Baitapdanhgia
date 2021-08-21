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
    static formatDateInput(date) {
        if (date) {
            
            date = date.replace(/\D/g, '');
            let formatDate = "";
            if (date.length < 3) {
                if (date.length == 1) {
                    if (date > 3)
                        return "0" + date;
                    else
                        return date;
                } else {
                    if (date > 31)
                        return 31;
                    else if (date < 1)
                        return "01";
                    else return date;
                }
            } else if (date.length < 5) {
                formatDate += date.substring(0, 2) + '/';
                // 01-31
                let month = date.substring(2, 4);

                if (month > 1 && month.length == 1) {
                    formatDate += "0" + month;
                } else {
                    if (month > 12)
                        return formatDate += 12;
                    else if (month < 1 & month.length == 2)
                        return formatDate += "01";
                    else return formatDate += month;
                }
            } else {
                formatDate += date.substring(0, 2) + "/" + date.substring(2, 4) + "/";

                let year = date.substring(4, 8);

                if (year > 9999)
                    formatDate += 9999;
                else
                    formatDate += year;

            }
            return formatDate;
        }
    }
    /**
     * Hàm tạo format số điện thoại kiểu Mỹ
     * Created By TBN (19/8/2021)
     * @param {*} telephoneNumber 
     * @returns 
     */
    static formatTelephoneNumber(telephoneNumber) {
        if (telephoneNumber) {
            // Kiểm tra xem có phải xóa cum ") " hay không
            if (telephoneNumber.indexOf(")") == telephoneNumber.length - 1) {
                return telephoneNumber.substring(0, 3);
            }
            // Xóa bỏ cái dấu "()- "
            telephoneNumber = telephoneNumber.replace(/[() -]/g, '');
            // Khởi tạo số điện thoại sau khi format
            let formatTelephoneNumber = "";
            // Nếu xóa cuối cùng thì không thêm gì
            if (telephoneNumber != "")
                formatTelephoneNumber = "(";
            // Kiểm tra xem có phải đang nhập 3 số đầu
            if (telephoneNumber.length < 3) {
                formatTelephoneNumber += telephoneNumber;
            } else if (telephoneNumber.length <= 6) {
                // Đang nhập 3 số giữa
                formatTelephoneNumber = "(" + telephoneNumber.substring(0, 3) + ') ';
                formatTelephoneNumber += telephoneNumber.substring(3, 6);
            } else {
                // Đang nhập 4 số cuối
                formatTelephoneNumber = "(" + telephoneNumber.substring(0, 3) + ') ' +
                    telephoneNumber.substring(3, 6) + '-';
                formatTelephoneNumber += telephoneNumber.substring(6, 10);
            }
            return formatTelephoneNumber;
        } else {
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