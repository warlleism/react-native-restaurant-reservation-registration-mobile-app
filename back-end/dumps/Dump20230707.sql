-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: reservasapp
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `mesas`
--

DROP TABLE IF EXISTS `mesas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mesas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` int DEFAULT NULL,
  `capacidade` int DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `id_restaurante` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_restaurante` (`id_restaurante`),
  CONSTRAINT `mesas_ibfk_1` FOREIGN KEY (`id_restaurante`) REFERENCES `restaurantes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesas`
--

LOCK TABLES `mesas` WRITE;
/*!40000 ALTER TABLE `mesas` DISABLE KEYS */;
INSERT INTO `mesas` VALUES (1,1,6,'mesa1','mesa de canto',1),(2,2,7,'mesa2','mesa superior esquerda',1),(3,3,8,'mesa3','mesa de jantar',1),(4,4,6,'mesa4','mesa superior direita',1),(5,5,7,'mesa5','mesa de canto',1),(6,6,8,'mesa6','mesa inferior direita',1),(7,7,6,'mesa7','mesa de canto',1),(8,8,7,'mesa8','mesa inferior esquerda',1),(9,9,8,'mesa9','mesa de jantar',1),(10,10,6,'mesa10','mesa inferior direita',1);
/*!40000 ALTER TABLE `mesas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `id_mesa` int DEFAULT NULL,
  `id_restaurante` int DEFAULT NULL,
  `data` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `quantidade_pessoas` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_reservas` (`data`,`hora`,`id_mesa`,`id_restaurante`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_mesa` (`id_mesa`),
  KEY `id_restaurante` (`id_restaurante`),
  CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`id_mesa`) REFERENCES `mesas` (`id`),
  CONSTRAINT `reservas_ibfk_3` FOREIGN KEY (`id_restaurante`) REFERENCES `restaurantes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (1,1,3,1,'2023-07-12','17:30:00',7),(4,1,3,1,'2023-07-12','18:30:00',7),(11,1,3,2,'2023-07-12','18:30:00',7);
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurantes`
--

DROP TABLE IF EXISTS `restaurantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurantes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `aberto` varchar(255) DEFAULT NULL,
  `horarioSem` varchar(255) DEFAULT NULL,
  `horarioFimSem` varchar(255) DEFAULT NULL,
  `img1` longtext,
  `img2` longtext,
  `img3` longtext,
  `img4` longtext,
  `img5` longtext,
  `descricao` varchar(255) DEFAULT NULL,
  `capacidade_maxima_reservas` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurantes`
--

LOCK TABLES `restaurantes` WRITE;
/*!40000 ALTER TABLE `restaurantes` DISABLE KEYS */;
INSERT INTO `restaurantes` VALUES (1,'Restaurante Bella Vita','Seg / Dom','18:00,19:00,20:00,21:00,22:00,23:00','19:00,20:00,21:00,22:00,23:00','img','img','img','img','img','Restaurante italiano com ambiente sofisticado',50),(2,'Restaurante Sabor do Mar','Sex / Dom','18:00,19:00,20:00,21:00,22:00,22:30','19:00,20:00,21:00,22:00,22:30','img','img','img','img','img','Restaurante especializado em frutos do mar',30),(3,'Restaurante Terra Gaúcha','Sex / Dom','18:00,19:00,20:00,21:00,22:00,22:30','19:00,20:00,21:00,22:00,22:30','img','img','img','img','img','Churrascaria tradicional com carnes nobres',40),(4,'Restaurante Bella Vita','Seg / Dom','18:00,19:00,20:00,21:00,22:00,23:00','19:00,20:00,21:00,22:00,23:00','img','img','img','img','img','Restaurante italiano com ambiente sofisticado',50),(5,'Restaurante Sabor do Mar','Sex / Dom','18:00,19:00,20:00,21:00,22:00,22:30','19:00,20:00,21:00,22:00,22:30','img','img','img','img','img','Restaurante especializado em frutos do mar',30),(6,'Restaurante Terra Gaúcha','Sex / Dom','18:00,19:00,20:00,21:00,22:00,22:30','19:00,20:00,21:00,22:00,22:30','img','img','img','img','img','Churrascaria tradicional com carnes nobres',40);
/*!40000 ALTER TABLE `restaurantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `foto` longtext,
  `email` varchar(255) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'João Silva',NULL,'joao.silva@example.com','senha123'),(2,'Maria Santos',NULL,'maria.santos@example.com','senha456'),(3,'Pedro Oliveira',NULL,'pedro.oliveira@example.com','senha789'),(4,'Ana Souza',NULL,'ana.souza@example.com','senhaabc'),(5,'Carlos Rodrigues',NULL,'carlos.rodrigues@example.com','senhaxyz');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-07 11:11:47
