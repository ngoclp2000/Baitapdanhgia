-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

--
-- Set default database
--
USE `Web06.TEST.MF914.TBNGOC`;

--
-- Create table `Department`
--
CREATE TABLE Department (
  DepartmentId char(36) NOT NULL COMMENT 'Id đơn vị nhân viên',
  DepartmentCode varchar(20) NOT NULL DEFAULT '' COMMENT 'mã code đơn vị',
  DepartmentName varchar(255) NOT NULL COMMENT 'tên đơn vị',
  Description varchar(255) DEFAULT NULL COMMENT 'mô tả bộ phận',
  CreatedBy varchar(100) DEFAULT NULL COMMENT 'người tạo',
  CreatedDate datetime DEFAULT NULL COMMENT 'ngày tạo',
  ModifiedBy varchar(100) DEFAULT NULL COMMENT 'người sửa',
  ModifiedDate datetime DEFAULT NULL COMMENT 'ngày sửa',
  PRIMARY KEY (DepartmentId)
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 3276,
CHARACTER SET utf8,
COLLATE utf8_general_ci,
COMMENT = 'đơn vị/phòng ban';

--
-- Create table `Employee`
--
CREATE TABLE Employee (
  EmployeeId char(36) NOT NULL COMMENT 'Id nhân viên',
  EmployeeCode varchar(20) NOT NULL COMMENT 'mã nhân viên',
  EmployeeName varchar(100) NOT NULL COMMENT 'tên nhân viên',
  DateOfBirth date DEFAULT NULL COMMENT 'ngày sinh',
  Gender int(11) DEFAULT NULL COMMENT 'giới tính: 0-nam; 1-nữ; 2-khác',
  DepartmentId char(36) NOT NULL COMMENT 'Id của đơn vị nhân viên',
  IdentityNumber varchar(20) DEFAULT NULL COMMENT 'số chứng minh thư nhân dân/ thẻ căn cước công dân',
  IdentityDate date DEFAULT NULL COMMENT 'ngày cấp CMTND/ thẻ căn cước công dân',
  IdentityPlace varchar(255) DEFAULT NULL COMMENT 'nơi cấp CMTND/ thẻ căn cước công dân',
  EmployeePosition varchar(255) DEFAULT NULL COMMENT 'chức danh nhân viên',
  Address varchar(255) DEFAULT NULL COMMENT 'địa chỉ nhân viên',
  BankAccountNumber varchar(20) DEFAULT NULL COMMENT 'số tài khoản',
  BankName varchar(255) DEFAULT NULL COMMENT 'tên ngân hàng',
  BankBranchName varchar(255) DEFAULT NULL COMMENT 'Tên chi nhánh  ngân hàng',
  BankProvinceName varchar(255) DEFAULT NULL COMMENT 'ngân hàng địa phương',
  PhoneNumber varchar(20) DEFAULT NULL COMMENT 'số điện thoại di động',
  TelephoneNumber varchar(20) DEFAULT NULL COMMENT 'số điện thoại cố định',
  Email varchar(50) DEFAULT NULL COMMENT 'email nhân viên',
  CreatedBy varchar(100) DEFAULT NULL COMMENT 'người tạo',
  CreatedDate datetime DEFAULT NULL COMMENT 'ngày tạo',
  ModifiedBy varchar(100) DEFAULT NULL COMMENT 'người sửa',
  ModifiedDate datetime DEFAULT NULL COMMENT 'ngày sửa',
  PRIMARY KEY (EmployeeId)
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 473,
CHARACTER SET utf8,
COLLATE utf8_general_ci,
COMMENT = 'thông tin nhân viên';

--
-- Create index `UK_Employee_EmployeeCode` on table `Employee`
--
ALTER TABLE Employee
ADD UNIQUE INDEX UK_Employee_EmployeeCode (EmployeeCode);

--
-- Create foreign key
--
ALTER TABLE Employee
ADD CONSTRAINT FK_Employee_DepartmentId FOREIGN KEY (DepartmentId)
REFERENCES Department (DepartmentId) ON DELETE NO ACTION;