using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Entities
{   
    /// <summary>
    /// Thuộc tính của nhân viên
    /// Created by TBN 21/7/2021
    /// </summary>
    public class Employee: BaseEntity
    {
        #region Properties
        /// <summary>
        /// Khóa chính
        /// </summary>
        [PrimaryKey]
        [DisplayName("Mã định danh nhân viên")]
        public Guid EmployeeId { get; set; }
        /// <summary>
        /// Mã nhân viên
        /// </summary>
        [CheckDuplication]
        [Required]
        [DisplayName("Mã nhân viên")]
        [MaxLengthValidation(20)]
        public string EmployeeCode { get; set; }
        /// <summary>
        /// Họ và Tên nhân viên
        /// </summary>
        [MaxLengthValidation(100)]
        [Required]
        [DisplayName("Họ và Tên")]
        public string EmployeeName { get; set; }
        /// <summary>
        /// Ngày sinh nhân viên
        /// </summary>
        public DateTime? DateOfBirth { get; set; }
        /// <summary>
        /// Mã giới tính
        /// </summary>
        public int? Gender { get; set; }
        /// <summary>
        /// Ngày gia nhập công ty
        /// </summary>
        
        /// <summary>
        /// Số điện thoại
        /// </summary>
        //[CheckDuplication]
        //[PhoneNumberValidation]
        [DisplayName("Số điện thoại di động")]
        [MaxLengthValidation(20)]
        public string PhoneNumber { get; set; }
        //[CheckDuplication]
        [DisplayName("Số điện thoại cố định")]
        [MaxLengthValidation(20)]
        //[USPhoneNumberValidation]
        public string TelephoneNumber { get; set; }
        /// <summary>
        /// Email
        /// </summary>
        //[CheckDuplication]
        //[EmailValidation]
        [DisplayName("Email")]
        [MaxLengthValidation(100)]
        public string Email { get; set; }
        /// <summary>
        /// Địa chỉ
        /// </summary>
        [MaxLengthValidation(255)]
        [DisplayName("Địa chỉ")]
        public string Address { get; set; }
        /// <summary>
        /// Mã đơn vị
        /// </summary>
        [Required]
        [DisplayName("Mã đơn vị")]
        public Guid? DepartmentId { get; set; }
        /// <summary>
        /// Tên đơn vị
        /// </summary>
        [Required]
        [MaxLengthValidation(255)]
        [DisplayName("Tên đơn vị")]
        public string DepartmentName { get; set; }
        /// <summary>
        /// Số CMND/Căn cước
        /// </summary>
        [MaxLengthValidation(20)]
        [IdentityNumberValidation]
        //[Required]
        //[CheckDuplication]
        [DisplayName("Số CMND/Căn cước công dân")]
        public string IdentityNumber { get; set; }
        /// <summary>
        /// Ngày cấp CMND/Căn cước
        /// </summary>
        public DateTime? IdentityDate { get; set; }
        /// <summary>
        /// Nơi cấp CMND/Căn cước
        /// </summary>
        [MaxLengthValidation(255)]
        [DisplayName("Nơi cấp CMND/ Căn cước công dân")]
        public string IdentityPlace { get; set; }
        /// <summary>
        /// Giới tính
        /// </summary>
        [MaxLengthValidation(20)]
        [DisplayName("Giới tính")]
        public string GenderName { get; set; }
        /// <summary>
        /// Chức vụ
        /// Created By TBN (18/8/2021)
        /// </summary>
        [MaxLengthValidation(255)]
        [DisplayName("Chức vụ")]
        public string EmployeePosition { get; set; }
        /// <summary>
        /// Số tài khoản ngân hàng
        /// Created By TBN (18/8/2021)
        /// </summary>
        [MaxLengthValidation(20)]
        //[CheckDuplication]
        [DisplayName("Số tài khoản ngân hàng")]
        public string BankAccountNumber { get; set; }
        /// <summary>
        /// Tên ngân hàng
        /// Created By TBN (18/8/2021)
        /// </summary>
        [MaxLengthValidation(255)]
        [DisplayName("Tên ngân hàng")]
        public string BankName { get; set; }
        /// <summary>
        /// Chi nhánh ngân hàng
        /// Created By TBN (18/8/2021)
        /// </summary>
        [MaxLengthValidation(255)]
        [DisplayName("Chi nhánh ngân hàng")]
        public string BankBranchName { get; set; }
        #endregion
    }
}
