using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Interface
{
    public interface IBaseRepository<MISAEntity>
    {
        #region Methods
        /// <summary>s
        /// Lây toàn bộ dữ liệu
        /// Create By TBN (26/7/2021)
        /// </summary>
        /// <returns>Danh sách dữ liệu</returns>
        IEnumerable<MISAEntity> GetMISAEntities();
        /// <summary>
        /// Lấy dữ liệu theo mã định danh
        /// </summary>
        /// Create By TBN (26/7/2021)
        /// <param name="misaEntityId"> Mã định danh của thực thể</param>
        /// <returns>Danh sách dữ liệu theo mã định danh</returns>
        MISAEntity GetMISAEntityById(Guid misaEntityId);
        /// <summary>
        /// Xóa dữ liệu theo mã định danh
        /// </summary>
        /// Create By TBN (26/7/2021)
        /// <param name="misaEntityId">Mã định danh của thực thể</param>
        /// <returns>Số bản ghi bị ảnh hưởng sau khi xóa dữ liệu</returns>
        int DeleteMISAEntityById(Guid misaEntityId);
        /// <summary>
        /// Cập nhật dữ liệu theo mã định danh
        /// </summary>
        /// Create By TBN (26/7/2021)
        /// <param name="misaEntity"></param>
        /// <param name="misaEntityId"></param>
        /// <returns>Số bản ghi bị ảnh hưởng sau khi cập nhật</returns>
        int UpdateMISAEnityById(MISAEntity misaEntity, Guid misaEntityId);
        /// <summary>
        /// Thêm mới dữ liệu
        /// </summary>
        /// Create by TBN (26/7/2021)
        /// <param name="misaEntity">Mã định danh của thực thể</param>
        /// <returns>Số bản ghi bị ảnh hưởng sau khi thêm mới</returns>
        int InsertMISAEntity(List<MISAEntity> misaEntity);
        /// <summary>
        /// Lấy dữ liệu theo đặc điểm cụ thể
        /// </summary>
        /// Created By TBN ( 27/7/2021)
        /// <param name="misaEntity"></param>
        /// <param name="property"></param>
        /// <returns>Dữ liệu theo đặc điểm cụ thể</returns>
        MISAEntity GetEntityBySpesProperty(MISAEntity misaEntity, PropertyInfo property);
        #endregion
    }
}
