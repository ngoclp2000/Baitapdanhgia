using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Entities
{
    public class Position: BaseEntity
    {
        /// <summary>
        /// Mã định danh phòng ban
        /// </summary>
        /// Created By TBN (29/7/2021)
        [PrimaryKey]
        public Guid PositionId { get; set; }
        /// <summary>
        /// Tên phòng ban
        /// </summary>
        /// Created By TBN (29/7/2021)
        [CheckDuplication]
        [DisplayName("Tên vị trí")]
        [MaxLengthValidation(255)]
        public string PositionName { get; set; }
        /// <summary>
        /// Mã code phòng ban
        /// </summary>
        /// Created By TBN (29/7/2021)
        [CheckDuplication]
        [DisplayName("Mã vị trí")]
        [MaxLengthValidation(20)]
        public string PositionCode { get; set; }
        /// <summary>
        /// Mô tả phòng ban
        /// </summary>
        /// Created By TBN (29/7/2021)
        [MaxLengthValidation(255)]
        [DisplayName("Mô tả")]
        public string Description { get; set; }
    }
}
