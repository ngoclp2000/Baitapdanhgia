class Common {
  static stringToAsciiString(str) {
    try {
      return str.replaceAll(/[àáảãạâầấẩẫậăằắẳẵặ]/g, 'a')
        .replaceAll(/[èéẻẽẹêềếểễệ]/g, 'e')
        .replaceAll(/[đ]/g, 'd')
        .replaceAll(/[ìíỉĩị]/g, 'i')
        .replaceAll(/[òóỏõọôồốổỗộơờớởỡợ]/g, 'o')
        .replaceAll(/[ùúủũụưừứửữự]/g, 'u')
        .replaceAll(/[ỳýỷỹỵ]/g, 'y')
    } catch {
      return ''
    }
  }
  /**
   * 
   * @param {int} length 
   * @returns 
   */
  static randomText(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }
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
}