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
        /// Họ nhân viên
        /// </summary>
        [MaxLengthValidation(100)]
        [DisplayName("Họ")]
        public string FirstName { get; set; }
        /// <summary>
        /// Tên đệm, Tên
        /// </summary>
        [MaxLengthValidation(100)]
        [DisplayName("Đệm Tên")]
        public string LastName { get; set; }
        /// <summary>
        /// Họ và Tên nhân viên
        /// </summary>
        [MaxLengthValidation(100)]
        [Required]
        [DisplayName("Họ và Tên")]
        public string FullName { get; set; }
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
        [CheckDuplication]
        [PhoneNumberValidation]
        [DisplayName("Số điện thoại")]
        [MaxLengthValidation(50)]
        [Required]
        public string PhoneNumber { get; set; }
        /// <summary>
        /// Email
        /// </summary>
        [CheckDuplication]
        [EmailValidation]
        [Required]
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
        /// Mã tình trạng công việc
        /// </summary>
        public int? WorkStatus { get; set; }
        /// <summary>
        /// Mã số thuế
        /// </summary>
        public string PersonalTaxCode { get; set; }
        /// <summary>
        /// Lương
        /// </summary>
        public double? Salary { get; set; }
        /// <summary>
        /// Mã vị trí 
        /// </summary>
        public Guid? PositionId { get; set; }
        /// <summary>
        /// Tên vị trí
        /// </summary>
        public string PositionName { get; set; }
        /// <summary>
        /// Mã phòng ban
        /// </summary>
        public Guid? DepartmentId { get; set; }
        /// <summary>
        /// Tên phòng ban
        /// </summary>
        public string DepartmentName { get; set; }
        /// <summary>
        /// Số CMND/Căn cước
        /// </summary>
        [MaxLengthValidation(25)]
        [IdentityNumberValidation]
        [Required]
        [CheckDuplication]
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
        /// Ngày tham gia
        /// </summary>
        public DateTime? JoinDate { get; set; }
        /// <summary>
        /// Tình trạng hôn nhân
        /// </summary>
        public int? MartialStatus { get; set; }
        /// <summary>
        /// Giáo dục
        /// </summary>
        [MaxLengthValidation(255)]
        [DisplayName("Trình độ học vấn")]
        public string EducationalBackground { get; set; }
        /// <summary>
        /// Mã xác thực
        /// </summary>
        public Guid? QualificationId { get; set; }
        /// <summary>
        /// Giới tính
        /// </summary>
        [MaxLengthValidation(100)]
        [DisplayName("Giới tính")]
        public string GenderName { get; set; }

        #endregion
    }
}
