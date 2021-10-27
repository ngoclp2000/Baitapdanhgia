using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interface;
using MISA.ApplicationCore.Services;
using System;
using System.Collections.Generic;
using System.Data;

namespace MISA.ApplicationCore
{
    public class CustomerService : BaseService<Customer>,ICustomerService
    {
        #region DECLARE
        ICustomerRepository _customerRepository;
        #endregion
        #region Constructor
        public CustomerService(ICustomerRepository customerRepository) :base(customerRepository)
        {
            _customerRepository = customerRepository;
        }
        #endregion
        #region Methods
        /// <summary>
        /// Lấy dữ liệu khách hàng theo code
        /// </summary>
        /// Created By TBN (31/7/2021)
        /// <param name="customerCode">Code của khách hàng cần lấy</param>
        /// <returns>Khách hàng tương ứng với code nếu có</returns>
        public Customer GetCustomerByCode(string customerCode)
        {
            return _customerRepository.GetCustomerByCode(customerCode);
        }
        /// <summary>
        /// Phương thức lấy dữ liệu khách hàng theo tiêu chí
        /// </summary>
        /// Created By TBN(31/7/2021)
        /// <param name="pageSize">Kích thước trang</param>
        /// <param name="pageIndex">Số trang</param>
        /// <param name="customerFilter">Dữ liệu cần lọc</param>
        /// <param name="customerGroupId">Mã nhóm khách hàng(nếu có)</param>
        /// <returns>Trả về đối tượng
        ///     TotalRecord: Tổng số bản ghi tương ứng với các tiêu chí
        ///     TotalPage: Tổng số trang tương ứng với kích thước cho trước
        ///     Data: Danh sách dữ liệu tại trang hiện tại cần lấy
        /// </returns>
        public object GetCustomersFilterPaging(int? pageSize, int? pageIndex, string customerFilter, Guid? customerGroupId)
        {
            if(customerFilter == null || pageSize <= 0 || pageIndex < 0)
            {
                var serviceResult = new ServiceResult();
                serviceResult.Data = string.Empty;
                serviceResult.Message = "Nhập sai trường";
                serviceResult.MISACode = MISACode.NotValid;
                return new
                {
                    serviceResult
                };
            }
            else
            {
                return _customerRepository.GetCustomersFilterPaging(pageSize, pageIndex, customerFilter, customerGroupId);
            }
        }
        /// <summary>
        /// Lấy code khách hàng mới 
        /// </summary>
        /// Created By TBN(31/7/2021)
        /// <returns>Code khách hàng mới nhất</returns>
        public string GetNewCustomerCode()
        {
            return _customerRepository.GetNewCustomerCode();
        }
        #endregion
    }
}
