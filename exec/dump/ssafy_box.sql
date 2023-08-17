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
-- Table structure for table `box`
--

DROP TABLE IF EXISTS `box`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `box` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_valid` bit(1) NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detailed_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zip_code` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_used` tinyint(1) DEFAULT NULL,
  `hardness` double NOT NULL,
  `latitude` double NOT NULL,
  `chat_room_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `box`
--

LOCK TABLES `box` WRITE;
/*!40000 ALTER TABLE `box` DISABLE KEYS */;
INSERT INTO `box` VALUES (123,'정상','공용',_binary '','광주광역시','장덕동 삼성전자 1공장 주차장 2번','62231',1,126.80091,35.174343,NULL),(124,'정상','공용',_binary '','광주광역시','장덕동 삼성전자 2공장 주차장 1번','62231',0,126.80091,35.174343,NULL),(129,'정상','공용',_binary '','광주광역시 광산구 ',' 장덕로 143 수완초등학교 1층 중앙 로비','62246',0,126.8243409,35.1977354,NULL),(130,'정상','공용',_binary '','광주광역시','광주광역시 장덕동','62231',1,126.80091,35.174343,NULL),(131,'정상','공용',_binary '','광주광역시','삼성전자 1공장 주차장 1번함','62244',0,126.80091,35.174343,NULL),(132,'정상','공용',_binary '','광주광역시','삼성전자 2공장 주차장 2번함','62244',0,126.80091,35.174343,NULL),(133,'정상','공용',_binary '','광주광역시','삼성전자 1공장 주차장 3번함','62244',0,126.80091,35.174343,NULL),(134,'정상','공용',_binary '','서울특별시','역삼동 멀티캠퍼스 1층 1번','06220',0,127.042109,37.498041,NULL),(135,'정상','공용',_binary '','광주광역시','삼성전자 2공장 주차장 3번함','62244',0,126.80091,35.174343,NULL),(136,'정상','공용',_binary '','서울특별시','역삼동 멀티캠퍼스 1층 2번','06220',0,127.042109,37.498041,NULL),(137,'정상','공용',_binary '','서울특별시','역삼동 멀티캠퍼스 1층 3번','06220',0,127.042109,37.498041,NULL),(138,'정상','공용',_binary '','광주광역시','고실중학교 1번함','62231',1,126.80091,35.174343,NULL),(139,'정상','공용',_binary '','광주광역시','고실중학교 2번함','62231',1,126.80091,35.174343,NULL),(140,'정상','공용',_binary '','광주광역시','성덕고등학교 1번함','62231',1,126.80091,35.174343,NULL),(141,'정상','공용',_binary '','광주광역시','성덕고등학교 2번함','62231',0,126.80091,35.174343,NULL);
/*!40000 ALTER TABLE `box` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-17 17:52:55
