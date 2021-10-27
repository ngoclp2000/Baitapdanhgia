using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Const
{
    /// <summary>
    /// Lớp chứa phương thức cho việc kiểm tra định dạng dữ liệu
    /// Created By TBN (4/8/2021)
    /// </summary>
    public static class Validator
    {
        #region DECLARE
        /// <summary>
        /// Khai báo regex cho định dạng email
        /// Created By TBN (4/8/2021)
        /// </summary>
        static private Regex ValidEmailRegex = CreateValidEmailRegex();
        /// <summary>
        /// Khai báo regex cho định dạng kiểu số
        /// Created By TBN (4/8/2021)
        /// </summary>
        static private Regex ValidNumberRegex = CreateValidNumberRegex();
        /// <summary>
        /// Khai baso regex cho định dạng số điện thoại Việt Nam
        /// </summary>
        /// Created By TBN (4/8/2021)
        static private Regex ValidVietnamesePhoneNumberRegex = CreateValidVietnamesePhoneNumberRegex();
        #endregion
        #region CreatedRegex
        /// <summary>
        /// Phương thức khởi tạo email regex
        /// </summary>
        /// Created By TBN (4/8/2021)
        /// <returns>Email Regex</returns>
        private static Regex CreateValidEmailRegex()
        {
            string validEmailPattern = @"^(?!\.)(""([^""\r\\]|\\[""\r\\])*""|"
                + @"([-a-z0-9!#$%&'*+/=?^_`{|}~]|(?<!\.)\.)*)(?<!\.)"
                + @"@[a-z0-9][\w\.-]*[a-z0-9]\.[a-z][a-z\.]*[a-z]$";
            return new Regex(validEmailPattern, RegexOptions.IgnoreCase);
        }
        /// <summary>
        /// Phương thức khởi tạo regex cho số
        /// </summary>
        /// Created By TBN (4/8/2021)
        /// <returns>Regex cho số</returns>
        private static Regex CreateValidNumberRegex()
        {
            string validNumberPattern = @"^\d+$";
            return new Regex(validNumberPattern);
        }
        /// <summary>
        /// Phương thức khởi tạo regex cho số điện thoại ở Việt Name
        /// </summary>
        /// Created By TBN (4/8/2021)
        /// <returns>Regex cho số điện thoại Việt Nam</returns>
        private static Regex CreateValidVietnamesePhoneNumberRegex()
        {
            string validVietnamesePhoneNumberPattern = "^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$";
            return new Regex(validVietnamesePhoneNumberPattern);
        }
        #endregion
        #region Methods
        /// <summary>
        /// Phương thức kiểm tra định dạng email
        /// </summary>
        /// Created by TBN (4/8/2021)
        /// <param name="email">Địa chỉ email cần kiểm tra</param>
        /// <returns>True= Đúng định dạng, False = Sai định dạng</returns>
        public static bool EmailValidation(string email)
        {
            return ValidEmailRegex.IsMatch(email);
        }
        /// <summary>
        /// Phương thức kiểm tra định dạng số
        /// </summary>
        /// Created By TBN (4/8/2021)
        /// <param name="number">Chuỗi cần kiểm tra</param>
        /// <returns>True= Chuỗi dạng số, False = Chuỗi không phải dạng số</returns>
        public static bool NumberValidation(string number)
        {
            return ValidNumberRegex.IsMatch(number);
        }
        /// <summary>
        /// Phương thức kiểm tra định dạng số điện thoại Việt Nam
        /// </summary>
        /// Created By TBN (4/8/2021)
        /// <param name="phoneNumber">Chuỗi số điện thoại cần kiểm tra</param>
        /// <returns>True= Đúng định dạng , False = Sai định dạng</returns>
        public static bool VietNamesePhoneNumberValidation(string phoneNumber)
        {
            return ValidVietnamesePhoneNumberRegex.IsMatch(phoneNumber);
        }
        #endregion
    }
}
