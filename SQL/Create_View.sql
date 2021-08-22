-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

--
-- Set default database
--
USE `Web06.TEST.MF914.TBNGOC`;

--
-- Create view `View_Employee`
--
CREATE
DEFINER = 'dev'@'%'
VIEW View_Employee
AS
SELECT
  `e`.`EmployeeId` AS `EmployeeId`,
  `e`.`EmployeeCode` AS `EmployeeCode`,
  `e`.`EmployeeName` AS `EmployeeName`,
  `e`.`Gender` AS `Gender`,
  `e`.`DateOfBirth` AS `DateOfBirth`,
  `e`.`PhoneNumber` AS `PhoneNumber`,
  `e`.`TelephoneNumber` AS `TelephoneNumber`,
  `e`.`EmployeePosition` AS `EmployeePosition`,
  `e`.`BankAccountNumber` AS `BankAccountNumber`,
  `e`.`BankName` AS `BankName`,
  `e`.`BankBranchName` AS `BankBranchName`,
  `e`.`Email` AS `Email`,
  `e`.`Address` AS `Address`,
  `e`.`IdentityNumber` AS `IdentityNumber`,
  `e`.`IdentityDate` AS `IdentityDate`,
  `e`.`IdentityPlace` AS `IdentityPlace`,
  `d`.`DepartmentId` AS `DepartmentId`,
  `d`.`DepartmentCode` AS `DepartmentCode`,
  `d`.`DepartmentName` AS `DepartmentName`,
  `e`.`CreatedDate` AS `CreatedDate`,
  `e`.`CreatedBy` AS `CreatedBy`,
  `e`.`ModifiedDate` AS `ModifiedDate`,
  `e`.`ModifiedBy` AS `ModifiedBy`
FROM (`Employee` `e`
  LEFT JOIN `Department` `d`
    ON ((`e`.`DepartmentId` = `d`.`DepartmentId`)));