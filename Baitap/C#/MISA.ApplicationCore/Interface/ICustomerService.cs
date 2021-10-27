using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Interface
{
    public interface ICustomerService : IBaseService<Customer>
    {
        #region Methods
        /// <summary>
        /// Lấu mã khách hàng mới
        /// Created By TBN ( 25/7/2021)
        /// </summary>
        /// <returns>Mã khách hàng </returns>
        string GetNewCustomerCode();
        /// <summary>
        /// Lấy khách hàng theo mã khách hàng
        /// </summary>
        /// Created By TBN (27/7/2021)
        /// <param name="CustomerCode">Mã khách hàng</param>
        /// <returns>Khách hàng tương ứng với mã code</returns>
        Customer GetCustomerByCode(string customerCode);
        /// <summary>
        /// Lấy danh sách khách hàng theo một số tiêu chí
        /// Created By TBN ( 25/7/2021)
        /// </summary>
        /// <param name="pageSize">Kích thước bản ghi trong 1 trang</param>
        /// <param name="pageIndex">Vị trí trang</param>
        /// <param name="customerFilter">Giá trị lọc</param>
        /// <param name="customerGroupId">Mã nhóm khách hàng</param>
        /// <returns>Danh sách khách hàng tương ứng với các tiêu chí trên</returns>
        object GetCustomersFilterPaging(int? pageSize, int? pageIndex, string customerFilter, Guid? customerGroupId);
        #endregion
    }
}
