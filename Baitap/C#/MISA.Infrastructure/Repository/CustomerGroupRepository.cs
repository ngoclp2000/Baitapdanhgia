using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Infrastructure.Repository
{
    public class CustomerGroupRepository : BaseRepository<CustomerGroup>,ICustomerGroupRepository
    {
        #region Constructor
        public CustomerGroupRepository(IConfiguration configuration) : base(configuration)
        {

        }
        #endregion
    }
}
