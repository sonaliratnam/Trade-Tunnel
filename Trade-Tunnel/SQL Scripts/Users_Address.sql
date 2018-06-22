-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: TradeTunnel
-- ------------------------------------------------------
-- Server version	5.7.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `Address`
--


/*!40000 ALTER TABLE `Address` DISABLE KEYS */;
INSERT INTO `Address` VALUES (1,'Apt 1','301,Lexington Avenue','Syracuse','New York','USA','13210',1),(2,'Apt 1','445 , Latona Rd','Rochester','New York','USA','14626',2),(3,'Apt 3','867  Lancaster Avenue','Syracuse','New York','USA','13210',3),(4,'Apt 3','605 Carlton Avenue','Brooklyn','New York','USA','11238',4);
/*!40000 ALTER TABLE `Address` ENABLE KEYS */;

--
-- Dumping data for table `Userprofile`
--


/*!40000 ALTER TABLE `Userprofile` DISABLE KEYS */;
INSERT INTO `Userprofile` VALUES (1,'Himanshu','Chhabra','himan@gmail.com','passw@rd123','+3154162421'),(2,'Aarsh','Patil','aarsh@gmail.com','passw@rd123','+3184265821'),(3,'Jessica','Adams','jessica@gmail.com','passw@rd123','+3184235376'),(4,'Peter','Parker','peter@gmail.com','passw@rd123','+3187265354');
/*!40000 ALTER TABLE `Userprofile` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-24 22:47:08
