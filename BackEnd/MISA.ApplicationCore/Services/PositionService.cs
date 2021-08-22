using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Services
{
    public class PositionService : BaseService<Position>, IPositionService
    {
        #region DECLARE
        IPositionRepository _positionRepository;
        #endregion
        #region Constructor
        public PositionService(IPositionRepository positionRepository):base(positionRepository)
        {
            _positionRepository = positionRepository;
        }
        #endregion
    }
}
