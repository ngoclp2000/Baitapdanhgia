using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Const;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interface;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Infrastructure.Repository
{
    public class CustomerRepository : BaseRepository<Customer>,ICustomerRepository
    {

        #region Constructor
        public CustomerRepository(IConfiguration configuration):base(configuration)
        {

        }
        #endregion
        #region Methods
        /// <summary>
        /// Lấy khách hàng theo mã code
        /// Created By TBN (25/7/2021)
        /// </summary>
        /// <param name="customerCode">Mã khách hàng</param>
        /// <returns>Khách hàng tương ứng với mã </returns>
        public Customer GetCustomerByCode(string customerCode)
        {
            // Câu lệnh truy vấn
            var sqlCommand = string.Format(StoredProcedure.GetEntityByCode, "Customer");   //"Proc_GetCustomerByCode";
            // Kết nối db nhận kết quả
            var customer = _dbConnection.Query<Customer>(sqlCommand, new { customerCode }, commandType: CommandType.StoredProcedure);
            return customer.FirstOrDefault();
        }
        /// <summary>
        /// Lấy danh sách khách hàng theo một số tiêu chí
        /// Created By TBN ( 25/7/2021)
        /// </summary>
        /// <param name="pageSize">Kích thước bản ghi trong 1 trang</param>
        /// <param name="pageIndex">Vị trí trang</param>
        /// <param name="customerFilter">Giá trị lọc</param>
        /// <param name="customerGroupId">Mã nhóm khách hàng</param>
        /// <returns>Danh sách khách hàng tương ứng với các tiêu chí trên</returns>
        public object GetCustomersFilterPaging(int? pageSize, int? pageIndex, string customerFilter, Guid? customerGroupId)
        {
            // Câu lệnh truy vấn
            var sqlCommand = string.Format(StoredProcedure.GetEntityFilterPaging,"Customer");   //"Proc_GetCustomersFilterPaging";
            // Tạo params truyền vào procedure
            var parameters = new DynamicParameters();
            parameters.Add("CustomerFilter", customerFilter, direction: ParameterDirection.Input);
            parameters.Add("CustomerGroupId", customerGroupId, direction: ParameterDirection.Input);
            parameters.Add("PageIndex", pageIndex, direction: ParameterDirection.Input);
            parameters.Add("PageSize", pageSize, direction: ParameterDirection.Input);
            parameters.Add("TotalRecord", dbType: DbType.Int32, direction: ParameterDirection.Output);
            parameters.Add("TotalPage", dbType: DbType.Int32, direction: ParameterDirection.Output);

            var customers = _dbConnection.Query<Customer>(sqlCommand, parameters, commandType: CommandType.StoredProcedure);
            return new
            {
                TotalPage = parameters.Get<int>("TotalPage"),
                TotalRecord = parameters.Get<int>("TotalRecord"),
                Data = customers
            };
        }
        /// <summary>
        /// Lấu mã khách hàng mới
        /// Created By TBN ( 25/7/2021)
        /// </summary>
        /// <returns>Mã khách hàng </returns>
        public string GetNewCustomerCode()
        {
            // Câu truy vấn
            var sqlCommand = string.Format(StoredProcedure.GetNewEntityCode,"Customer"); //"Proc_GetNewCustomerCode";
            // Gửi truy vấn lên db và nhận lại kết quả
            var newCustomerCode = _dbConnection.Query<string>(sqlCommand, commandType: CommandType.StoredProcedure);
            // Trả về kết quả
            if (newCustomerCode != null)
            {
                return newCustomerCode.First().ToString();
            }
            else
            {
                return null;
            }
        }
        #endregion
    }
}
