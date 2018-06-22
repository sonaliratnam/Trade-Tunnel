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
-- Dumping data for table `Categories`
--

/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` VALUES (1,'Electronics'),(2,'Furniture'),(3,'Apparels'),(4,'Books'),(5,'Sports'),(6,'Vehicles');
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `SubCategories`
--

/*!40000 ALTER TABLE `SubCategories` DISABLE KEYS */;
INSERT INTO `SubCategories` VALUES (1,'Laptop',1),(2,'Headphones',1),(3,'Mobile Phone',1),(4,'Video Game',1),(5,'Television',1),(6,'Watches',1),(7,'Camera',1),(8,'Table',2),(9,'Chair',2),(10,'Bed',2),(11,'Wardrobe',2),(12,'Dining',2),(13,'Sofa',2),(14,'Shirt',3),(15,'Formal Pants',3),(16,'Informal Pants',3),(17,'Skirts',3),(18,'Jackets',3),(19,'Shrugs',3),(20,'Thermal wear',3),(21,'Gown',3),(22,'Childern Books',4),(23,'Magazines',4),(24,'Technology',4),(25,'Kindle Books',4),(26,'Novels',4),(27,'Story Books',4),(28,'Comics',4),(29,'Gym Suit',5),(30,'Gym Accessories',5),(31,'Sports Shoes',5),(32,'Sedan Car',6),(33,'SUV',6),(34,'Cycles',6),(35,'Motor Bikes',6);
/*!40000 ALTER TABLE `SubCategories` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-17 17:16:18
