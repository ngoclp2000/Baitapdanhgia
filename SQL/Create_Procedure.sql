-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

--
-- Set default database
--
USE `Web06.TEST.MF914.TBNGOC`;

DELIMITER $$

--
-- Create procedure `Proc_UpdateEmployee`
--
CREATE DEFINER = 'dev'@'%'
PROCEDURE Proc_UpdateEmployee (IN EmployeeId char(36), IN EmployeeCode varchar(20), IN EmployeeName varchar(100), IN Gender int, IN DateOfBirth datetime, IN PhoneNumber varchar(50), IN TelephoneNumber varchar(20), IN Email varchar(100), IN Address varchar(255), IN IdentityNumber varchar(25), IN IdentityDate datetime, IN IdentityPlace varchar(255), IN DepartmentId char(36), EmployeePosition varchar(255), BankAccountNumber varchar(20), BankName varchar(255), BankBranchName varchar(255))
BEGIN
  UPDATE Employee e
  SET e.EmployeeCode = EmployeeCode,
      e.EmployeeName = EmployeeName,
      e.Gender = Gender,
      e.DateOfBirth = DateOfBirth,
      e.PhoneNumber = PhoneNumber,
      e.TelephoneNumber = TelephoneNumber,
      e.EmployeePosition = EmployeePosition,
      e.BankAccountNumber = BankAccountNumber,
      e.BankName = BankName,
      e.BankBranchName = BankBranchName,
      e.Email = Email,
      e.Address = Address,
      e.IdentityNumber = IdentityNumber,
      e.IdentityDate = IdentityDate,
      e.IdentityPlace = IdentityPlace,
      e.DepartmentId = DepartmentId,
      e.ModifiedDate = CURRENT_TIMESTAMP()
  WHERE e.EmployeeId = EmployeeId;
END
$$

--
-- Create procedure `Proc_InsertEmployee`
--
CREATE DEFINER = 'dev'@'%'
PROCEDURE Proc_InsertEmployee (IN EmployeeId char(36), IN EmployeeCode varchar(20), IN EmployeeName varchar(100), IN Gender int, IN DateOfBirth datetime, IN PhoneNumber varchar(50), IN TelephoneNumber varchar(20), IN Email varchar(100), IN Address varchar(255), IN IdentityNumber varchar(25), IN IdentityDate datetime, IN IdentityPlace varchar(255), IN DepartmentId char(36), EmployeePosition varchar(255), BankAccountNumber varchar(20), BankName varchar(255), BankBranchName varchar(255))
BEGIN
  INSERT INTO Employee (EmployeeId,
  EmployeeCode,
  EmployeeName,
  Gender,
  DateOfBirth,
  PhoneNumber,
  Email,
  Address,
  IdentityNumber,
  IdentityDate,
  IdentityPlace,
  DepartmentId,
  CreatedDate,
  TelephoneNumber,
  EmployeePosition,
  BankAccountNumber,
  BankName,
  BankBranchName)
    VALUES (UUID(), EmployeeCode, EmployeeName, Gender, DateOfBirth, PhoneNumber, Email, Address, IdentityNumber, IdentityDate, IdentityPlace, DepartmentId, CURRENT_TIMESTAMP(), TelephoneNumber, EmployeePosition, BankAccountNumber, BankName, BankBranchName);
END
$$

--
-- Create procedure `Proc_GetNewEmployeeCode`
--
CREATE DEFINER = 'dev'@'%'
PROCEDURE Proc_GetNewEmployeeCode ()
BEGIN
  DECLARE maxCodeNumber int DEFAULT 0;
  DECLARE maxCode varchar(20) DEFAULT '';
  DECLARE n int DEFAULT 0;
  DECLARE i int DEFAULT 0;
  DECLARE code varchar(20) DEFAULT '';
  DECLARE codeNumber int DEFAULT 0;
  SELECT
    COUNT(*)
  FROM Employee e INTO n;
  WHILE i < n DO
    SELECT
      e.EmployeeCode
    FROM Employee e LIMIT i, 1 INTO code;
    SET codeNumber = Func_GetSubfixIsNumber(code);
    IF codeNumber > maxCodeNumber THEN
      SET maxCodeNumber = codeNumber;
      SET maxCode = code;
    END IF;
    SET i = i + 1;
  END WHILE;

  SET @SUB_NEW_CODE = maxCodeNumber + 1;
  SET @LASTEST_CODE_LEN = LENGTH(maxCode);
  SET @SUB_LASTEST_CODE_LEN = LENGTH(maxCodeNumber);
  SET @PREFIX_CODE = LEFT(maxCode, @LASTEST_CODE_LEN - @SUB_LASTEST_CODE_LEN);

  SET @NEW_CODE = CONCAT(@PREFIX_CODE, @SUB_NEW_CODE);
  SELECT
    @NEW_CODE Ma_NV;
END
$$

--
-- Create procedure `Proc_GetEmployeesFilterPaging`
--
CREATE DEFINER = 'dev'@'%'
PROCEDURE Proc_GetEmployeesFilterPaging (IN EmployeeFilter varchar(255), IN PageIndex int, IN PageSize int, OUT TotalRecord int, OUT TotalPage int)
BEGIN
  DECLARE PageOffset int;
  SET @EmployeeFilter = (SELECT
      EmployeeFilter);
  SET PageOffset = PageIndex * PageSize;
  IF PageSize > 0 THEN

    CREATE TEMPORARY TABLE FilteredTable
    SELECT
      e.EmployeeId,
      e.EmployeeCode,
      e.EmployeeName,
      e.Gender,
      Func_RetreiveGenderName(e.Gender) GenderName,
      e.DateOfBirth,
      e.PhoneNumber,
      e.Email,
      e.Address,
      e.EmployeePosition,
      e.BankAccountNumber,
      e.BankName,
      e.BankBranchName,
      e.TelephoneNumber,
      e.IdentityNumber,
      e.IdentityDate,
      e.IdentityPlace,
      e.DepartmentId,
      e.DepartmentCode,
      e.DepartmentName,
      e.CreatedDate,
      e.CreatedBy,
      e.ModifiedDate,
      e.ModifiedBy
    FROM View_Employee e
    WHERE (@EmployeeFilter <=> NULL
    OR Func_CheckEqual(@EmployeeFilter, e.EmployeeCode)
    OR Func_CheckEqual(@EmployeeFilter, e.EmployeeName)
    OR Func_CheckEqual(@EmployeeFilter, e.PhoneNumber))
    ORDER BY e.CreatedDate DESC
    ;

    SELECT
      *
    FROM FilteredTable ft LIMIT PageSize OFFSET PageOffSet;

    SET TotalRecord = (SELECT
        COUNT(*)
      FROM FilteredTable ft);
    DROP TEMPORARY TABLE FilteredTable;
    SET @NumberRecordLastPage = TotalRecord % PageSize;

    IF @NumberRecordLastPage > 0 THEN
      SET TotalPage = FLOOR(TotalRecord / PageSize) + 1;
    ELSE
      SET TotalPage = TotalRecord / PageSize;
    END IF;
  END IF;
END
$$

--
-- Create procedure `Proc_GetEmployees`
--
CREATE DEFINER = 'dev'@'%'
PROCEDURE Proc_GetEmployees ()
BEGIN
  SELECT
    *
  FROM View_Employee
  ORDER BY CreatedDate DESC;
END
$$

--
-- Create procedure `Proc_GetEmployeeById`
--
CREATE DEFINER = 'dev'@'%'
PROCEDURE Proc_GetEmployeeById (IN EmployeeId char(36))
BEGIN
  SELECT
    *
  FROM View_Employee e
  WHERE e.EmployeeId = EmployeeId;
END
$$

--
-- Create procedure `Proc_GetEmployeeByCode`
--
CREATE DEFINER = 'dev'@'%'
PROCEDURE Proc_GetEmployeeByCode (IN EmployeeCode varchar(20))
BEGIN
  SELECT
    *
  FROM Employee e
  WHERE e.EmployeeCode = EmployeeCode;
END
$$

--
-- Create procedure `Proc_GetDepartments`
--
CREATE DEFINER = 'dev'@'%'
PROCEDURE Proc_GetDepartments ()
BEGIN
  SELECT
    *
  FROM Department d;
END
$$

--
-- Create procedure `Proc_DeleteEmployeeById`
--
CREATE DEFINER = 'dev'@'%'
PROCEDURE Proc_DeleteEmployeeById (IN EmployeeId varchar(36))
BEGIN
  DELETE
    FROM Employee
  WHERE Employee.EmployeeId = EmployeeId;
END
$$

DELIMITER ;