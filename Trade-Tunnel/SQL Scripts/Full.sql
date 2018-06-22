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
-- Dumping data for table `Categories`
--


/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` VALUES (1,'Electronics'),(2,'Furniture'),(3,'Apparels'),(4,'Books'),(5,'Sports'),(6,'Vehicles');
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;


--
-- Dumping data for table `Product`
--


/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES (1,'MacBook Pro Laptop','16 GB , 500 GB SSD , i5 Intel ,2017 Model',850.00,'2018-04-24','unsold',1,1,1),(2,'HP Desire Laptop','8 GB , 1 TB HDD , 2015  Z9RP Model',670.00,'2018-04-24','unsold',2,1,1),(3,'Dell Slip Pro Laptop','12 GB , 2 TB HDD , DE14 Model',500.00,'2018-04-24','unsold',3,1,1),(4,'Lenovo ThinkPad Laptop','8 GB , 500 GB SSD , LEN16 Model',720.00,'2018-04-24','unsold',4,1,1),(5,'JBL HeadPhone','Super Bass ,JBL 4Xr',325.00,'2018-04-24','unsold',1,1,2),(6,'Ear Pods Headphone','Apple Original',145.00,'2018-04-24','unsold',2,1,2),(7,'Panasonic QLed Television','75-Inch HD Android TV',980.00,'2018-04-24','unsold',3,1,5),(8,'Dinning Table','Glass Designer Table, with Chairs',110.00,'2018-04-24','unsold',4,2,8),(9,'Skull Candy Headphone','Super Bass ,S4XGB',280.00,'2018-04-24','unsold',3,1,2),(10,'Indoor Easy Chair','Cushion Chair',44.00,'2018-04-24','unsold',4,2,9),(11,'Study Table','Long Study Table (Free Chair)',22.00,'2018-04-24','unsold',4,2,8),(12,'iPhone 8 Plus','64 GB Rose Gold',650.00,'2018-04-24','unsold',1,1,3),(13,'Samsung Galaxy S8 Plus','64 GB Black',655.00,'2018-04-24','unsold',2,1,3),(14,'High Chair','Wooden Chair',32.00,'2018-04-25','unsold',3,2,9),(15,'Onida Television','75-Inch 4K Ultra HD Smart LED TV',1200.00,'2018-04-25','unsold',1,1,5),(16,'PlayStation 4 Slim','1TB Console , (Free Games)',400.00,'2018-04-25','unsold',1,1,4),(17,'HP Laptop','8 GB RAM , 500 GB HDD,Ram i3,XR12',450.00,'2018-04-25','unsold',2,1,1),(18,'PlayStation 4 (Black Slim)','500 GB Console Black',350.00,'2018-04-25','unsold',2,1,4),(19,'LG Smart TV','65-Inch Television',985.00,'2018-04-25','unsold',2,1,5),(20,'Phone X','128 GB Space Gray',900.00,'2018-04-25','unsold',2,1,3),(21,'Phone X','64 GB Silver',920.00,'2018-04-25','unsold',3,1,3),(22,'Wheel Chair','New Condition Chair (Free Locks )',38.00,'2018-04-25','unsold',3,2,9),(23,'Casio G- Shock','Mens Wrist Watch Sporty',120.00,'2018-04-25','unsold',1,1,6),(24,'Omega Diving Watch','Color:Silver-Toned',200.00,'2018-04-25','unsold',4,1,6),(25,'Women\'s Skirt','Elastic Flare Pleated A-line',25.33,'2018-04-25','unsold',3,3,17),(26,'Nike Athletic T-Shirt','Men’s Essential Nylon T-Shirt L',12.00,'2018-04-25','unsold',2,3,14),(27,'Curve Neck  T-Shirt',' XXL Size',8.00,'2018-04-25','unsold',3,3,14),(28,'Women\'s Retro Skirt','Elastic Waist Flare Pleated A-line',22.00,'2018-04-25','unsold',3,3,17);
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;


--
-- Dumping data for table `SubCategories`
--


/*!40000 ALTER TABLE `SubCategories` DISABLE KEYS */;
INSERT INTO `SubCategories` VALUES (1,'Laptop',1),(2,'Headphones',1),(3,'Mobile Phone',1),(4,'Video Game',1),(5,'Television',1),(6,'Watches',1),(7,'Camera',1),(8,'Table',2),(9,'Chair',2),(10,'Bed',2),(11,'Wardrobe',2),(12,'Dining',2),(13,'Sofa',2),(14,'Shirt',3),(15,'Formal Pants',3),(16,'Informal Pants',3),(17,'Skirts',3),(18,'Jackets',3),(19,'Shrugs',3),(20,'Thermal wear',3),(21,'Gown',3),(22,'Childern Books',4),(23,'Magazines',4),(24,'Technology',4),(25,'Kindle Books',4),(26,'Novels',4),(27,'Story Books',4),(28,'Comics',4),(29,'Gym Suit',5),(30,'Gym Accessories',5),(31,'Sports Shoes',5),(32,'Sedan Car',6),(33,'SUV',6),(34,'Cycles',6),(35,'Motor Bikes',6);
/*!40000 ALTER TABLE `SubCategories` ENABLE KEYS */;


--
-- Dumping data for table `Userprofile`
--


/*!40000 ALTER TABLE `Userprofile` DISABLE KEYS */;
INSERT INTO `Userprofile` VALUES (1,'Himanshu','Chhabra','himan@gmail.com','passw@rd123','+3154162421'),(2,'Aarsh','Patil','aarsh@gmail.com','passw@rd123','+3184265821'),(3,'Jessica','Adams','jessica@gmail.com','passw@rd123','+3184235376'),(4,'Peter','Parker','peter@gmail.com','passw@rd123','+3187265354');
/*!40000 ALTER TABLE `Userprofile` ENABLE KEYS */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-25  0:45:12
