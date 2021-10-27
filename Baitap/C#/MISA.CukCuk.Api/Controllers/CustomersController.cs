using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using MySqlConnector;
using System.Data;
using MISA.ApplicationCore;
using MISA.ApplicationCore.Interface;
using MISA.ApplicationCore.Entities;
using MISA.CukCuk.Api.Controllers;

namespace MISA.CukCuk.Api.Api
{
    public class CustomersController : BaseEntityController<Customer>
    {
        #region DECLARE
        ICustomerService _customerService;
        #endregion
        #region Constructor
        public CustomersController(ICustomerService customerService) :base(customerService)
        {
            _customerService = customerService;
        }
        #endregion
        #region Methods
        /// <summary>
        /// Lấy danh sách khách hàng theo tiêu chí
        /// </summary>
        /// <param name="pageSize">Kích cỡ trang</param>
        /// <param name="pageIndex">Số trang</param>
        /// <param name="customerFilter">Trường lọc dữ liệu</param>
        /// <param name="customerGroupId">Mã nhóm khách hàng</param>
        /// <returns></returns>
        [HttpGet("CustomersFilter")]
        public IActionResult GetCustomersFilter(int? pageSize,  int? pageIndex, string customerFilter, Guid? customerGroupId)
        {
            try
            {
                // Kiểm tra nghiệp vụ đồng thời nhận kết quả trả về của yêu cầu
                object res = _customerService.GetCustomersFilterPaging(pageSize, pageIndex, customerFilter, customerGroupId);
                // Kiểm tra xem có trả về khác object serviceResult hay k - ServiceReult = Lỗi, object chứa đầy đủ thông tin = Đúng
                if (res.GetType().GetProperty("serviceResult") != null)
                {
                    return BadRequest(res);
                }
                else
                {
                    return Ok(res);
                }
            }catch(Exception ex)
            {
                return StatusCode(500, new ServiceResult
                {
                    Data = ex.Message,
                    Message = new
                    {
                        devMsg = Properties.Resources.SystemErrorDev,
                        usrMsg = Properties.Resources.SystemErrorUsr
                    },
                    MISACode = MISACode.Exception
                });
            }
        }
        /// <summary>
        /// Lấy mã khách hàng mới
        /// </summary>
        /// Created By TBN (28/7/2021)
        /// <returns>Mã khách hàng mới</returns>
        [HttpGet("NewCustomerCode")]
        public IActionResult GetNewCustomerCode()
        {
            try
            {
                var res = _customerService.GetNewCustomerCode();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ServiceResult
                {
                    Data = ex.Message,
                    Message = new
                    {
                        devMsg = Properties.Resources.SystemErrorDev,
                        usrMsg = Properties.Resources.SystemErrorUsr
                    },
                    MISACode = MISACode.Exception
                });
            }
        }
        #endregion
    }
}
