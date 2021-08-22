using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// Thuộc tính của nhóm khách hàng
    /// </summary>
    /// Created By TBN (5/8/2021)
    public class CustomerGroup : BaseEntity
    {
        /// <summary>
        /// Mã nhóm khách hàng
        /// </summary>
        /// Created By TBN (29/7/2021)
        [PrimaryKey]
        public Guid CustomerGroupId { get; set; }
        /// <summary>
        /// Tên nhóm khách hàng
        /// </summary>
        /// Created By TBN (29/7/2021)
        [CheckDuplication]
        [DisplayName("Tên nhóm khách hàng")]
        [MaxLengthValidation(255)]
        public string CustomerGroupName { get; set; }
        /// <summary>
        /// Mô tả
        /// </summary>
        /// Created By TBN (29/7/2021)
        [MaxLengthValidation(255)]
        [DisplayName("Mô tả")]
        public string Description { get; set; }
    }
}
