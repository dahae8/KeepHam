-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: i9c104.p.ssafy.io    Database: ssafy
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `agreement` bit(1) NOT NULL,
  `chatroom_id` bigint NOT NULL,
  `info` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` datetime DEFAULT NULL,
  `price` int NOT NULL,
  `total_point` int NOT NULL,
  `user_nick_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (31,_binary '',-1,'충전','2023-08-14 08:19:54',10000,10000,'닉네임1'),(60,_binary '',-1,'충전','2023-08-16 16:28:31',20000,20000,'닉네임2'),(71,_binary '',-1,'충전','2023-08-17 11:17:55',50000,50000,'넌내게목욕값을줬어'),(72,_binary '',-1,'충전','2023-08-17 11:17:55',50000,50000,'카드값줘체리'),(73,_binary '',-1,'충전','2023-08-17 11:17:55',50000,50000,'커피중독자'),(74,_binary '',-1,'충전','2023-08-17 11:17:55',50000,50000,'나사용자'),(91,_binary '',-1,'충전','2023-08-01 17:17:55',50000,50000,'관리자'),(92,_binary '',-1,'충전','2023-08-17 17:17:55',500000,500000,'닉네임3'),(93,_binary '',-1,'충전','2023-08-17 17:17:55',500000,500000,'닉네임4'),(94,_binary '',-1,'충전','2023-08-17 17:17:55',500000,500000,'닉네임5'),(95,_binary '',-1,'충전','2023-08-17 17:17:55',500000,500000,'닉네임6'),(96,_binary '',-1,'충전','2023-08-17 17:17:55',500000,500000,'닉네임7'),(97,_binary '',-1,'충전','2023-08-17 17:17:55',500000,500000,'닉네임8'),(98,_binary '',-1,'충전','2023-08-17 17:17:55',500000,500000,'닉네임9'),(99,_binary '',-1,'충전','2023-08-17 17:17:55',500000,500000,'user10'),(100,_binary '',-1,'충전','2023-08-17 17:17:55',500000,500000,'user11'),(101,_binary '',-1,'충전','2023-08-17 17:17:55',500000,500000,'user12'),(102,_binary '',-1,'충전','2023-08-17 17:17:55',500000,500000,'user13'),(103,_binary '',-1,'충전','2023-08-17 17:17:55',500000,500000,'user14'),(104,_binary '',-1,'충전','2023-08-17 17:17:55',500000,500000,'user15'),(105,_binary '',-1,'충전','2023-08-17 17:17:55',500000,500000,'user16'),(106,_binary '',-1,'충전','2023-08-17 17:17:55',500000,500000,'user17'),(107,_binary '',-1,'충전','2023-08-17 17:17:55',500000,500000,'user18'),(108,_binary '',-1,'충전','2023-08-17 17:17:55',500000,500000,'user19'),(109,_binary '',-1,'충전','2023-08-17 17:17:55',500000,500000,'user20'),(110,_binary '',10,'본죽-광주수완장덕점','2023-08-02 11:37:55',-21000,29000,'관리자'),(112,_binary '',10,'투썸플레이스-광주수완대로DT점','2023-08-05 13:37:55',-5000,24000,'관리자'),(113,_binary '',10,'땅스부대찌개-광주수완점','2023-08-09 12:26:15',-18000,6000,'관리자'),(114,_binary '\0',297,'떡의작품가래떡볶이-광주산정점','2023-08-17 17:21:33',-9000,491000,'닉네임7'),(115,_binary '\0',297,'떡의작품가래떡볶이-광주산정점','2023-08-17 17:21:33',-13500,6500,'닉네임2'),(116,_binary '',-1,'충전','2023-08-11 12:26:15',50000,56000,'관리자'),(117,_binary '',10,'인생아구찜-광산점','2023-08-11 12:30:15',-23000,33000,'관리자'),(118,_binary '',10,'더벤티-광주장덕중앙점','2023-08-11 13:39:15',-9000,24000,'관리자'),(119,_binary '',10,'두마리찜닭두찜-광주월곡점','2023-08-13 11:45:35',-15400,8600,'관리자'),(120,_binary '',-1,'환불','2023-08-13 12:26:15',-8600,0,'관리자'),(121,_binary '\0',299,'떡의작품가래떡볶이-광주산정점','2023-08-17 17:26:36',-13500,477500,'닉네임7'),(122,_binary '\0',299,'떡의작품가래떡볶이-광주산정점','2023-08-17 17:26:36',-9000,-2500,'닉네임2'),(123,_binary '',-1,'충전','2023-08-14 11:26:15',50000,50000,'관리자'),(124,_binary '',10,'북경옛날손짜장','2023-08-15 11:45:35',-13000,37000,'관리자'),(125,_binary '',-1,'충전','2023-08-14 11:26:15',5000000,50000000,'재드래곤'),(127,_binary '',-1,'충전','2023-08-14 11:26:15',5000000,50000000,'TimCook'),(128,_binary '\0',303,'떡의작품가래떡볶이-광주산정점','2023-08-17 17:42:15',-4500,473000,'닉네임7'),(129,_binary '\0',303,'떡의작품가래떡볶이-광주산정점','2023-08-17 17:42:15',-4500,495500,'닉네임4'),(130,_binary '\0',305,'떡의작품가래떡볶이-광주산정점','2023-08-17 17:44:28',-10500,462500,'닉네임7'),(131,_binary '\0',305,'떡의작품가래떡볶이-광주산정점','2023-08-17 17:44:28',-4500,491000,'닉네임4'),(132,_binary '',309,'컴포즈커피-월곡점','2023-08-17 17:48:52',-3400,496600,'닉네임5'),(133,_binary '',309,'컴포즈커피-월곡점','2023-08-17 17:48:52',-4000,49996000,'재드래곤'),(134,_binary '',309,'컴포즈커피-월곡점','2023-08-17 17:49:49',7400,498400,'닉네임4');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-17 17:53:01
