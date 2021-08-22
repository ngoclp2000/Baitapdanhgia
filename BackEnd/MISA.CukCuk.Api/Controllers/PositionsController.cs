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
using MISA.CukCuk.Api.Controllers;
using MISA.ApplicationCore.Interface;

namespace MISA.CukCuk.Api.Api
{
   
    public class PositionsController : BaseEntityController<Position>
    {
        #region DECLARE
        IPositionService _positionService;
        #endregion
        #region Constructor
        public PositionsController(IPositionService positionService):base(positionService)
        {
            _positionService = positionService;
        }
        #endregion
    }
}
