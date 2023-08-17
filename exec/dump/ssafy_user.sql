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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `age` int DEFAULT NULL,
  `birthday` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `create_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nick_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tel` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account_status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_d2ia11oqhsynodbsi46m80vfc` (`nick_name`),
  UNIQUE KEY `UK_a3imlf41l37utmxiquukk8ajc` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (72,NULL,NULL,NULL,'2023-08-14 01:32:53.219623','string',NULL,'string','닉네임1','$2a$10$BzMsMaWUkTaWOHhVE5nS1u1oWpq1hEHb/QjQBXkLUuW2yjkP0mAr2','string','user1','USER','ACTIVE'),(73,NULL,NULL,NULL,'2023-08-14 01:32:59.873103','string',NULL,'string','닉네임2','$2a$10$o2s3Ix7SNFShlXz4qyA1KO0LHkGpiSl9MEsWaGsL9XDLdWecNS2E2','string','user2','USER','ACTIVE'),(74,NULL,NULL,NULL,'2023-08-14 01:33:04.205792','string',NULL,'string','닉네임3','$2a$10$AZtZaHC5BAy8hfqKAW6/He1crzberB2N/eEvef4Kdsa/s6Yf/JL1m','string','user3','USER','ACTIVE'),(75,NULL,NULL,NULL,'2023-08-14 01:33:08.189708','string',NULL,'string','닉네임4','$2a$10$Azf6HGgeqdZ8/NOlkf.EKuGe8BQ5yEAhwOrwsm3vn.apfUT9.qr.6','string','user4','USER','ACTIVE'),(76,NULL,NULL,NULL,'2023-08-14 01:33:12.520775','string',NULL,'string','닉네임5','$2a$10$AVv/JveBXej4VDuI6.2tFuAflK8dt2IMsGeNVRpJJbh1CYDZgunAW','string','user5','USER','ACTIVE'),(77,NULL,NULL,NULL,'2023-08-14 01:33:17.425954','string',NULL,'string','닉네임6','$2a$10$i7YER5BbhxLhMIgvuD46/uLwsv5OBmk55CLj9P9O7RnaShJ4G3jCy','string','user6','USER','ACTIVE'),(78,NULL,NULL,NULL,'2023-08-14 01:33:24.200610','string',NULL,'string','닉네임7','$2a$10$sNyjUkBlNYlx4esl0eWVC.QZR8Ew4rZV/hBqnsBo0m4ELADPPyYJG','string','user7','USER','ACTIVE'),(79,NULL,NULL,NULL,'2023-08-14 01:33:29.310363','string',NULL,'string','닉네임8','$2a$10$1lAIn1Blh8rCcas2zIdfhelI8x4jGrqaZIyftmVpBnQPvNrFoLs5C','string','user8','USER','ACTIVE'),(80,NULL,NULL,NULL,'2023-08-14 01:33:33.594686','string',NULL,'string','닉네임9','$2a$10$uiBFKJAiquNPRx.0l2WWKuuPEDz2a4kKuXikpenyZNzDksQFwVdfS','string','user9','USER','ACTIVE'),(81,NULL,NULL,NULL,'2023-08-14 01:33:47.328794','string',NULL,'string','관리자','$2a$10$D2197ZcGk6HqxHXa9y8J6u5ptYsB8aKPbNhwjTEna8EZS.9b1fwFW','string','user0','ADMIN','ACTIVE'),(82,NULL,NULL,NULL,'2023-08-15 14:59:57.531221','이건머야',NULL,'정진솔','jjs','$2a$10$TG64wkUHQ77Wt8ozP3MFaeEDG9PvbMBa/trqC5TvG2mB7mkVrd4rG','01030148123','jjs','USER','ACTIVE'),(83,NULL,NULL,NULL,'2023-08-15 14:37:51.308497','string',NULL,'string','string','$2a$10$W0EHzQO2AJm9I9r1RJ0K3e9ehcJRTboc/APF2XdmW2scNlChMeHwS','string','string','USER','ACTIVE'),(84,NULL,NULL,NULL,'2023-08-15 15:26:24.187628','이건머야',NULL,'이은경','이은경','$2a$10$w0idfei0Ye6Z5SaK.D84KO.MrE7AX9qGnPXXuSSHkp0INn3Sj0CT6','01065154094','coco1','USER','ACTIVE'),(85,NULL,NULL,NULL,'2023-08-16 08:55:15.756013','이건머야',NULL,'이성연','딸긔맛떡','$2a$10$Qd6M1THl8UP8ni4FRiNI4.GSDLYmE2zLPVGoC2LMbTANmZ.b5yt4e','4938','tester','USER','ACTIVE'),(86,NULL,NULL,NULL,'2023-08-16 09:10:08.655542','이건머야',NULL,'ㅂㅂ','ㅂㅂ','$2a$10$.H5bGgcOSZCikvy.i1qQbOYgxNe2xsJdh8CP.xb3YSQ2SeQChtWJ.','ㅂㅂ','ㅂㅂ','USER','ACTIVE'),(88,NULL,NULL,NULL,'2023-08-16 01:39:17.729151','string',NULL,'ssafy5','ssafy5','$2a$10$crTq8.WDrTKjthh3Zdo6xeVPci6vOkeWzfBbiXACN0hA.guZqzDCW','string','ssafy5','USER','ACTIVE'),(89,NULL,NULL,NULL,'2023-08-16 02:02:42.023278','이건머야',NULL,'choi','난누군가','$2a$10$7SvXgbWg4NjfnhxFPU8kseZO/rgNhexI3URO7q0Ta2tKzildZoV8y','123','choi','USER','ACTIVE'),(90,NULL,NULL,NULL,'2023-08-16 11:18:57.928856','이건머야',NULL,'소영섭','소영섭','$2a$10$mPAgx/YRMzao2sRtl2sQMOGQzW3ex53cXizvcSW4srB4bLScZXTEi','01012341234','ssafy1','USER','ACTIVE'),(92,NULL,NULL,NULL,'2023-08-16 14:59:42.830229','이건머야',NULL,'이재용','JaeDragon','$2a$10$f8.Gm.vviTDdoLm4iZQ2RODUuU.N/pgM08bGoefXO//h1XHQ0x7c6','1234','jaedragon','USER','ACTIVE'),(93,NULL,NULL,NULL,'2023-08-16 21:28:48.084467','이건머야',NULL,'asfdfdg','asdfdge','$2a$10$NZ.LfAgvQq18NJTRVo71ZeHhZNtPW7WT0JVMYQYTD1qlxM1eOouTe','010-4151-1414','qwe123','USER','ACTIVE'),(94,NULL,NULL,NULL,'2023-08-17 12:07:22.435861','keepham104@naver.com',NULL,'나유저','나사용자','$2a$10$AKC1nDfE3oNvMInux2ZF7uqNEIvg7unr.r4dWxDevlHpUHy.hA5m.','010-1234-1234','keepham104','USER','ACTIVE'),(95,NULL,NULL,NULL,'2023-08-17 12:09:33.369278','qwer1234@naver.com',NULL,'qwer','커피중독자','$2a$10$uVjTrRafkOZrOx/f//VVB.Rrq3RAvNrMMyFQy0n9XEUlvSKDi5A5e','010-1234-1234','qwer1234','USER','ACTIVE'),(96,NULL,NULL,NULL,'2023-08-17 12:11:18.528753','asdf456@gmail.com',NULL,'asdf','카드값줘체리','$2a$10$kCBLzrWsJziNW3vZXBFhVeFvRiu0OHbaASeX9DDaY2JvEH5qr3aLu','010-1234-1234','asdf456','USER','ACTIVE'),(97,NULL,NULL,NULL,'2023-08-17 12:14:01.570222','zxcv789@gmail.com',NULL,'zxcv','넌내게목욕값을줬어','$2a$10$gdNTud0C1Nu4KwkrGNljnexRWHKGPNzuuOqvNnIGZjBNhkD3.9ks.','010-1234-1234','zxcv789','USER','ACTIVE'),(98,NULL,NULL,NULL,'2023-08-17 13:37:32.555861','이건머야',NULL,'권준일','권주일','$2a$10$G5xVXUc.TiINlqM2zGRpOOjFn7GzK7AOwggX6BojPlFuXJoQHlwzO','11','1234','USER','ACTIVE'),(99,NULL,NULL,NULL,'2023-08-17 07:49:11.599597','string',NULL,'user10','user10','$2a$10$PPcyW95WhOjY6t.UZyMmmOI2Dan2llB6DC.PejgGQAy3BEHoVm0xK','string','user10','USER','ACTIVE'),(100,NULL,NULL,NULL,'2023-08-17 07:49:20.888931','string',NULL,'user11','user11','$2a$10$qwZOB4mSp6Y/ST2vNNjMiOxOJa8nNF71GLCcttmJAbxend/1kCtNK','string','user11','USER','ACTIVE'),(101,NULL,NULL,NULL,'2023-08-17 07:49:30.442681','string',NULL,'user12','user12','$2a$10$oMCHSF9F2I/5yMzrZj8Tgu0KY77bta8OMq1NEkVcIpNRK.GE2gaCu','string','user12','USER','ACTIVE'),(102,NULL,NULL,NULL,'2023-08-17 07:49:38.016568','string',NULL,'user13','user13','$2a$10$JxJuZNSZqa.45d0DlyzP.Ob9E6KRxlXgedQxtJbUGyEC6rvcfl75u','string','user13','USER','ACTIVE'),(103,NULL,NULL,NULL,'2023-08-17 07:49:50.966683','string',NULL,'user14','user14','$2a$10$qMjqT4vthlQy1I.igPKoEu8Io/j/.LWAQFNXzAToyFvtFZCgEDRYK','string','user14','USER','ACTIVE'),(104,NULL,NULL,NULL,'2023-08-17 07:50:00.902778','string',NULL,'user15','user15','$2a$10$fpk4u3lVxeyqgRs/mtJQ/exsy6Kac.2JHmGrnSLLkIoFF9jXHrqIq','string','user15','USER','ACTIVE'),(105,NULL,NULL,NULL,'2023-08-17 07:50:12.339989','string',NULL,'user16','user16','$2a$10$Fm5z5Rzs6pm40bqjmvvoBOuu/Ets8ZSwpYSKmkuf15BO0C3o2UKRa','string','user16','USER','ACTIVE'),(106,NULL,NULL,NULL,'2023-08-17 07:50:20.249764','string',NULL,'user17','user17','$2a$10$J/FGZ37xHTTrPM19mphLeefNYW/oUOFiPs6rAVloBI1A/jakvRdDG','string','user17','USER','ACTIVE'),(107,NULL,NULL,NULL,'2023-08-17 07:50:28.548702','string',NULL,'user18','user18','$2a$10$mIO0ZAHrc5n06oFRZnXtMu5RQVeodISMmwreYYw88L5qBzz9whxra','string','user18','USER','ACTIVE'),(108,NULL,NULL,NULL,'2023-08-17 07:50:50.152693','string',NULL,'user20','user20','$2a$10$QZCpZUvdUm7b0Ds8zWmGxeRFqS6.xRF3fKuRxeEnkUvjLVPdklPMO','string','user20','USER','ACTIVE'),(109,NULL,NULL,NULL,'2023-08-17 17:32:38.502434','이건머야',NULL,'재드래곤','재드래곤','$2a$10$19DBnQrhedc4fhR7cHO8r.ND.gegJd9DB32M3c2IJTQ6/Tuqgi25W','4938','user30','USER','ACTIVE'),(122,NULL,NULL,NULL,'2023-08-17 17:39:47.693568','이건머야',NULL,'TimCook','TimCook','$2a$10$V7osgx/YjCPKAJxaxWGqrOZWCeEjb9XyoQbRRIn7S0.df8nmFtWq6','1234','user50','USER','ACTIVE');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-17 17:52:54
