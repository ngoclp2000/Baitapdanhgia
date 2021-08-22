using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using System.Threading.Tasks;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interface;

namespace MISA.CukCuk.Api.Controllers
{
    
    public class CustomerGroupsController : BaseEntityController<CustomerGroup>
    {
        #region DECLARE
        ICustomerGroupService _customerGroupService;
        #endregion
        #region Constructor
        public CustomerGroupsController(ICustomerGroupService customerGroupService) : base(customerGroupService)
        {
            _customerGroupService = customerGroupService;
        }
        #endregion
    }
}
