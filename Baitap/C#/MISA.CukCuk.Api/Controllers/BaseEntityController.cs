using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BaseEntityController<MISAEntity> : ControllerBase
    {
        #region DECLARE
        IBaseService<MISAEntity> _baseService;
        #endregion
        #region Constructor
        public BaseEntityController(IBaseService<MISAEntity> baseService)
        {
            _baseService = baseService;
        }
        #endregion
        #region Methods
        /// <summary>
        /// Lấy toàn bộ dữ liệu
        /// </summary>
        /// Created by TBN( 26/7/2021 )
        /// <returns>
        ///  Danh sách dữ liệu dưới dạng mảng object
        /// </returns>
        [HttpGet]
        public virtual IActionResult GetMISAEntities()
        {
            try
            {
                var misaEntities = _baseService.GetMISAEntities();
                return Ok(misaEntities);
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
        /// Lấy dữ liệu theo mã định danh 
        /// </summary>
        /// Created By TBN (26/7/2021)
        /// <param name="id">Mã định danh</param>
        /// <returns>Trả về dữ liệu nhân viên theo mã định danh</returns>
        [HttpGet("{id}")]
        public virtual IActionResult GetMISAEntityById(Guid id)
        {
            try
            {
                var misaEntity = _baseService.GetMISAEntityById(id);
                if (misaEntity != null)
                {
                    return Ok(misaEntity);
                }
                else
                {
                    return NoContent();
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
        /// <summary>
        /// Xóa dữ liệu theo mã định danh
        /// </summary>
        /// <param name="id"> Mã nhân viên </param>
        /// Created By TBN (26/7/2021)
        /// <returns> Thông tin sau khi thực hiện yêu cầu </returns>
        [HttpDelete("{id}")]
        public virtual IActionResult DeleteMISAEntityById(Guid id)
        {
            try
            {
                var serviceResult = _baseService.DeleteMISAEntityById(id);
                return Ok(serviceResult);
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
        /// <summary>
        /// Thêm mới dữ liệu
        /// </summary>
        /// <param name="misaEntity">Dữ liệu</param>
        /// Created By TBN (26/7/2021)
        /// <returns> Thông tin sau khi thực hiện yêu cầu </returns>
        [HttpPost]
        public virtual IActionResult InsertMISAEntity(List<MISAEntity> misaEntityList)
        {
            try
            {
                // Chạy phương thức thêm mới
                var serviceResult = _baseService.InsertMISAEntity(misaEntityList);
                // Kiểm tra các mã trả về
                if (serviceResult.MISACode == MISACode.NotValid)
                {
                    return BadRequest(serviceResult);
                }
                else
                {
                    return StatusCode(201,serviceResult);
                }
            }
            catch(Exception ex)
            {
                
                return StatusCode(500,new ServiceResult
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
        /// Cập thông tin dữ liệu
        /// </summary>
        /// <param name="customer">Dữ liêụ</param>
        /// <param name="id">Mã định danh</param>
        /// Created By TBN (26/7/2021)
        /// <returns> Thông tin sau khi thực hiện yêu cầu</returns>
        [HttpPut("{id}")]
        public virtual IActionResult UpdateEmployeeById(MISAEntity misaEntity, Guid id)
        {
            try
            {
                var serviceResult = _baseService.UpdateMISAEnityById(misaEntity, id);
                if (serviceResult.MISACode == MISACode.NotValid)
                {
                    return BadRequest(serviceResult);
                }
                else
                {
                    return Ok(serviceResult);
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
        #endregion
    }
}
