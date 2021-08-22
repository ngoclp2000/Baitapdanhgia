using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Services
{
    public class EmployeeService : BaseService<Employee>, IEmployeeService
    {
        #region DECLARE
        IEmployeeRepository _employeeRepository;
        #endregion
        #region Constructor
        public EmployeeService(IEmployeeRepository employeeRepository) : base(employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        #endregion
        #region Methods
        /// <summary>
        /// Lấy dữ liệu nhân viên theo code nhân viên
        /// </summary>
        /// Created By TBN (31/7/2021)
        /// <param name="employeeCode">Code của nhân viên muốn lấy</param>
        /// <returns>Trả về dữ liệu nhân viên tương ứng với mã code nếu có</returns>
        public Employee GetEmployeeByCode(string employeeCode)
        {
            return _employeeRepository.GetEmployeeByCode(employeeCode);
        }
        /// <summary>
        /// Phương thức lấy dữ liệu nhân viên theo tiêu chí
        /// </summary>
        /// Created By TBN(31/7/2021)
        /// <param name="pageSize">Kích thước trang</param>
        /// <param name="pageIndex">Số trang </param>
        /// <param name="employeeFilter">Dữ liệu cần lọc</param>
        /// <param name="departmentId">Mã định danh phòng ban(nếu có)</param>
        /// <param name="positionId">Mã định danh vị trí(nếu có)</param>
        /// <returns>Trả về đối tượng
        ///     TotalRecord: Tổng số bản ghi tương ứng với các tiêu chí
        ///     TotalPage: Tổng số trang tương ứng với kích thước cho trước
        ///     Data: Danh sách dữ liệu tại trang hiện tại cần lấy
        /// </returns>
        public object GetEmployeesFilterPaging(int? pageSize, int? pageIndex, string employeeFilter)
        {
            if (pageSize <= 0 || pageIndex < 0)
            {
                var errorMessageArr = new List<object>();
     
                if (pageSize <= 0)
                {
                    errorMessageArr.Add(new
                    {
                        devMsg = string.Format(Properties.Resources.InvalidFieldDev, "Kích thức trang", pageSize, pageSize.GetType()),
                        usrMsg = string.Format(Properties.Resources.InvalidFieldUsr, "Kích thước trang", pageSize, pageSize.GetType())
                    });
                }
                if (pageIndex < 0)
                {
                    errorMessageArr.Add(new
                    {
                        devMsg = string.Format(Properties.Resources.InvalidFieldDev, "Số trang", pageIndex, pageIndex.GetType()),
                        usrMsg = string.Format(Properties.Resources.InvalidFieldUsr, "Sô trang", pageIndex, pageIndex.GetType())
                    });
                }
                var serviceResult = new ServiceResult
                {
                    Data = string.Empty,
                    Message = errorMessageArr,
                    MISACode = MISACode.NotValid
                };
                return serviceResult;
            }
            else
            {
                return _employeeRepository.GetEmployeesFilterPaging(pageSize, pageIndex, employeeFilter);
            }
        }
        /// <summary>
        /// Lấy code nhân viên mới nhất
        /// </summary>
        /// Created By TBN (31/7/2021)
        /// <returns>Code nhân viên mới nhất</returns>
        public string GetNewEmployeeCode()
        {
            return _employeeRepository.GetNewEmployeeCode();
        }
        #endregion
    }
}
