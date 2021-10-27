using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using MySqlConnector;
using System.Data;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interface;
using MISA.CukCuk.Api.Controllers;
using MISA.ApplicationCore;

namespace MISA.CukCuk.Api.Api
{
   public class EmployeesController : BaseEntityController<Employee> {
        #region DECLARE
        IEmployeeService _employeeService;
        #endregion
        #region Constructor
        public EmployeesController(IEmployeeService employeeService) : base(employeeService)
        {
            _employeeService = employeeService;
        }
        #endregion
        /// <summary>
        /// Lấy  mã nhân viên mới 
        /// </summary>
        /// <returns>
        /// Mã nhân viên mới dưới dạng string
        /// </returns>
        [HttpGet("NewEmployeeCode")]
        public IActionResult GetNewEmployeeCode()
        {
            try
            {
                var res = _employeeService.GetNewEmployeeCode();
                return Ok(res);
            }   
            catch(Exception ex)
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
        /// Lọc dữ liệu theo yêu cầu lọc
        /// </summary>
        /// <param name="PageSize"></param>
        /// <param name="PageNumber"></param>
        /// <param name="EmployeeFilter"></param>
        /// <param name="DepartmentId"></param>
        /// <param name="PositionId"></param>
        /// <returns> Trả về danh sách nhân viên theo yêu cầu lọc </returns>
        [HttpGet("EmployeeFilter")]
        public IActionResult GetFilterEmployee(int? pageSize, int? pageIndex, string employeeFilter, Guid? departmentId, Guid? positionId)
        {
            try
            {
                object res = _employeeService.GetEmployeesFilterPaging(pageSize, pageIndex, employeeFilter, departmentId, positionId);
                if (res != null && res.GetType().GetProperty("serviceResult") != null)
                {
                    return BadRequest(res);
                }
                else
                {
                    return Ok(res);
                }
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
        
    }
}
