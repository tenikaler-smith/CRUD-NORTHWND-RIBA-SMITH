CREATE DATABASE IF NOT EXISTS `northwnd`;

use `northwnd`;

CREATE TABLE `customers` (
  `CustomerID` int(5) unsigned auto_increment primary key,
  `CompanyName` varchar(40) NOT NULL,
  `ContactName` varchar(30) DEFAULT NULL,
  `ContactTitle` varchar(30) DEFAULT NULL,
  `Address` varchar(60) DEFAULT NULL,
  `City` varchar(15) DEFAULT NULL,
  `Region` varchar(15) DEFAULT NULL,
  `PostalCode` varchar(10) DEFAULT NULL,
  `Country` varchar(15) DEFAULT NULL,
  `Phone` varchar(24) DEFAULT NULL,
  `Fax` varchar(24) DEFAULT NULL,
  `totalordenes` varchar(20) DEFAULT NULL
);

SHOW TABLES;

describe customers;
