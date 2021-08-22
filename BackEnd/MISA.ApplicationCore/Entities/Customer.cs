using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// Thuộc tính của khách hàng
    /// Created By TBN (5/8/2021)
    /// </summary>
    public class Customer : BaseEntity
    {

        /// <summary>
        /// Mã định danh khách hàng
        /// </summary>
        /// Created By TBN (29/7/2021)
        [PrimaryKey]
        [DisplayName("Mã định danh khách hàng")]
        public Guid CustomerId { get; set; }
        /// <summary>
        /// Mã khách hàng
        /// </summary>
        /// Created By TBN (29/7/2021)
        [CheckDuplication]
        [Required]
        [DisplayName("Mã khách hàng")]
        [MaxLengthValidation(25)]
        public string CustomerCode { get; set; }
        /// <summary>
        /// Họ
        /// </summary>
        /// Created By TBN (29/7/2021)
        [MaxLengthValidation(100)]
        [DisplayName("Họ")]
        public string FirstName { get; set; }
        /// <summary>
        /// Tên Đệm + Tên
        /// </summary>
        /// Created By TBN (29/7/2021)
        [MaxLengthValidation(100)]
        [DisplayName("Đệm và Tên")]
        public string LastName { get; set; }
        /// <summary>
        /// Họ và Tên
        /// </summary>
        /// Created By TBN (29/7/2021)
        [MaxLengthValidation(100)]
        [Required]
        [DisplayName("Họ và tên")]
        public string FullName { get; set; }
        /// <summary>
        /// Mã giới tính
        /// </summary>
        /// Created By TBN (29/7/2021)
        public int? Gender { get; set; }
        /// <summary>
        /// Giới tính
        /// </summary>
        /// Created By TBN (29/7/2021)
        [MaxLengthValidation(100)]
        [DisplayName("Giới tính")]
        public string GenderName { get; set; }
        /// <summary>
        /// Địa chỉ
        /// </summary>
        /// Created By TBN (29/7/2021)
        [MaxLengthValidation(255)]
        [DisplayName("Địa chỉ")]
        public string Address { get; set; }
        /// <summary>
        /// Ngày sinh
        /// </summary>
        /// Created By TBN (29/7/2021)
        public DateTime? DateOfBirth { get; set; }
        /// <summary>
        /// Email
        /// </summary>
        /// Created By TBN (29/7/2021)
        [CheckDuplication]
        [EmailValidation]
        [Required]
        [DisplayName("Email")]
        [MaxLengthValidation(100)]
        public string Email { get; set; }
        /// <summary>
        /// Số điện thoại
        /// </summary>
        /// Created By TBN (29/7/2021)
        [CheckDuplication]
        [PhoneNumberValidation]
        [Required]
        [DisplayName("Số điện thoại")]
        [MaxLengthValidation(50)]
        public string PhoneNumber { get; set; }
        /// <summary>
        /// Mã nhóm khách hàng
        /// </summary>
        /// Created By TBN (29/7/2021)
        public Guid? CustomerGroupId { get; set; }
        /// <summary>
        /// Tên nhóm khách hàng
        /// </summary>
        /// Created By TBN (29/7/2021)
        public string CustomerGroupName { get; set; }
        /// <summary>
        /// Tiền nợ
        /// </summary>
        /// Created By TBN (29/7/2021)
        public int? DebitAmount { get; set; }
        /// <summary>
        /// Mã thành viên
        /// </summary>
        /// Created By TBN (29/7/2021)
        [MaxLengthValidation(20)]
        [CheckDuplication]
        [DisplayName("Mã thẻ thành viên")]
        public string MemberCardCode { get; set; }
        /// <summary>
        /// Tên công ty
        /// </summary>
        /// Created By TBN (29/7/2021)
        [MaxLengthValidation(255)]
        [DisplayName("Tên công ty")]
        public string CompanyName { get; set; }
        /// <summary>
        /// Mã công ty
        /// </summary>
        /// Created By TBN (29/7/2021)
        [MaxLengthValidation(20)]
        [CheckDuplication]
        [DisplayName("Mã số thuế công ty")]
        public string CompanyTaxCode { get; set; }
        /// <summary>
        /// Ngừng theo dõi
        /// </summary>
        /// Created By TBN (29/7/2021)
        public int? IsStopFollow { get; set; }
    }
}
