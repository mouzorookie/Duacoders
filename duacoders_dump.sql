-- MySQL dump 10.13  Distrib 9.0.1, for Linux (x86_64)
--
-- Host: localhost    Database: Duacoders
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `departamento`
--

DROP TABLE IF EXISTS `departamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `duacoder`
--

DROP TABLE IF EXISTS `duacoder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `duacoder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nif` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `biografia` text COLLATE utf8mb4_unicode_ci,
  `departamento` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `puesto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skills` json DEFAULT NULL,
  `foto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gustoTortilla` tinyint NOT NULL,
  `fechaNacimiento` date DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `duacoder`
--

LOCK TABLES `duacoder` WRITE;
/*!40000 ALTER TABLE `duacoder` DISABLE KEYS */;
INSERT INTO `duacoder` VALUES (1,'12345679A','Iván Mouzo','Desarrollador de software con experiencia en múltiples tecnologías. Técnico electrónico con habilidad en programación de arduinos y PLCs. Entusiasta del mundo maker, Linux e inteligencia artificial Gestor de proyectos eficiente.','Backend','Backend Developer','[\"JavaScript\", \"TypeScript\", \"Node.js\", \"Arduino\", \"PLC\", \"Linux\", \"Java\", \"React\", \"Git\", \"Docker\", \"Gestión de proyectos\", \"Notion\", \"Trello\"]','http://localhost:3000/uploads/duacoders/url_de_la_foto',1,'1996-03-19','tu_contraseña_segura'),(2,'66666666F','Jorge','Contador con experiencia en auditorías financieras internacionales.','Finanzas','Analista','[\"Contabilidad\", \"Auditoría\", \"Microsoft Excel\"]','url_de_la_foto',1,'1980-07-07','$2b$10$KRYohM3TJNcDP0VllR2xBeXB83sJn.yTKn8x1HiJ7XXQ/PNa9COGi'),(3,'66666666F','Fernando','Contador con experiencia en auditorías financieras internacionales.','Finanzas','Analista','[\"Contabilidad\", \"Auditoría\", \"Microsoft Excel\"]','url_de_la_foto',1,'1980-07-07','$2b$10$KBrEjkvKDyxn4n10Xn7wwuUgfHl5D8b2UNTpqoeUKDIMJhwz4NybO'),(4,'55555555E','Elena','Desarrolladora frontend apasionada por el diseño responsivo.','Tecnología','Frontend Developer','[\"HTML\", \"CSS\", \"React\"]','url_de_la_foto',0,'1994-11-30','$2b$10$Vof0Ocy.8VWVOmYEb/KRBuH8p1bcgkaWt6U02oZHwlfg7NMmFM6n6'),(5,'44444444D','Diana','Diseñadora gráfica con pasión por el diseño UI/UX.','Recursos Humanos','Ejecutivo de Cuentas','[\"Adobe Photoshop\", \"Figma\", \"Sketch\"]','foto-1732153142865-190823402.jpeg',1,'1992-03-18','$2b$10$nywjCfFrIZM6jEAVp3sEMuMDKhRWqieRr3SYVJCf9.STF6aAoStxa'),(6,'44444444D','Diana','Diseñadora gráfica con pasión por el diseño UI/UX.','Recursos Humanos','Ejecutivo de Cuentas','[\"Adobe Photoshop\", \"Figma\", \"Sketch\"]','url_de_la_foto',1,'1992-03-18','$2b$10$lZJ/zzX7RbC3JLitN.IMD.rjeXZvMqAeTg77EDkhTDfx8lEO0RW8e'),(7,'33333333C','Carlos','Manager con experiencia en liderazgo de equipos multidisciplinares.','Ventas','Manager','[\"Gestión de equipos\", \"CRM\", \"Negociación\"]','url_de_la_foto',1,'1985-09-23','$2b$10$4eA4akBAwO9JVAH/4XI1CeH.SANsg09oFe55ATDPuFXiynI6juO6e'),(8,'22222222B','Beatriz','Especialista en marketing digital y análisis de datos.','Marketing','Analista','[\"SEO\", \"Google Analytics\", \"Data Studio\"]','url_de_la_foto',0,'1988-05-12','$2b$10$KtWzlTQBg98yD5ueRzjHFe/fcKcBn3y62n1toaLh12tznWnbAr5G6'),(9,'11111111A','Alberto','Desarrollador de software con experiencia en múltiples tecnologías.','Tecnología','Backend Developer','[\"JavaScript\", \"TypeScript\", \"Node.js\"]','url_de_la_foto',1,'1990-01-01','$2b$10$z25CnpSyTIHEVj4NbTMJuO58M9Mz.w3fTY.Kw4Rm6P9aCGw.phPZK'),(10,'66666666F','Jorge','Contador con experiencia en auditorías financieras internacionales.','Finanzas','Analista','[\"Contabilidad\", \"Auditoría\", \"Microsoft Excel\"]','url_de_la_foto',1,'1980-07-07','$2b$10$cvOmi4ECyhMClMoLVHGYzedH175VhHduZNqYNL6D8zbWxMRlOg6hu'),(11,'67867867Z','Alberto','Contador con experiencia en auditorías financieras internacionales.','Finanzas','Analista','[\"Contabilidad\", \"Auditoría\", \"Microsoft Excel\"]','url_de_la_foto',1,'1980-07-07','$2b$10$DnpcQkbisJjIvgUa8kVrVeqJ0MindL02oAKwwSIuqobZXTbfp/Y9u'),(14,'67867867Z','Albertito','Contador con experiencia en auditorías financieras internacionales.','Finanzas','Analista','[\"Contabilidad\", \"Auditoría\", \"Microsoft Excel\"]',NULL,1,'1980-07-07','$2b$10$15tiljWf7vy5QmJmUyi60.OVV9LoW11IBcPek0AG745PekdHjptgm'),(15,'67867867Z','Albertito','Contador con experiencia en auditorías financieras internacionales.','Finanzas','Analista','[\"Contabilidad\", \"Auditoría\", \"Microsoft Excel\"]',NULL,1,'1980-07-07','$2b$10$odgY6S/c0kgWzOts6emOkOJSRjsx3T3XsB2Vdd00BvpAjbIfmiZ.e');
/*!40000 ALTER TABLE `duacoder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puesto`
--

DROP TABLE IF EXISTS `puesto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puesto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puesto`
--

LOCK TABLES `puesto` WRITE;
/*!40000 ALTER TABLE `puesto` DISABLE KEYS */;
/*!40000 ALTER TABLE `puesto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-21  3:31:25
