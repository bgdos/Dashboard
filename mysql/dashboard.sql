create database dashboard;
use dashboard;

CREATE TABLE IF NOT EXISTS `delivery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `qty` int(11) NOT NULL,
  `d_date` date NOT NULL,
  `total` int(11) NOT NULL,
  `model_Id` int(11) NOT NULL,
  `material_Id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `model_Id` (`model_Id`),
  KEY `material_Id` (`material_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

INSERT INTO delivery(qty,d_date,total,model_Id,material_Id)
values(90,'2015-05-15',50,2,2),
(80,'2015-05-03',50,2,3),
(70,'2015-05-18',50,2,4),
(60,'2015-05-16',50,2,5),
(50,'2015-05-15',50,2,1),
(40,'2015-05-14',50,2,2);
.
--Consulta
SELECT SUM(CASE WHEN model_id = 2 AND d_date = "2015-05-15" THEN qty else 0 END) AS daily, SUM(CASE WHEN model_id = 2 THEN qty ELSE 0 END) AS total
FROM delivery;
-- --------------------------------------------------------

--
-- Table structure for table `line`
--

CREATE TABLE IF NOT EXISTS `line` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

insert  into line(description)
values('A'),
('B'),
('C'),
('H');
-- --------------------------------------------------------


--
-- Table structure for table `model`
--

CREATE TABLE IF NOT EXISTS `model` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` int(11) NOT NULL,
  `owner` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `lot` int(11) NOT NULL,
  `sdate` date NOT NULL,
  `line_Id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `line_Id` (`line_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

insert into model(number,owner,lot,sdate,line_Id)values
(30009515,'Pepsi',84,'2015-05-08',1),
(30009709,'Pepsi',64,'2015-05-07',2),
(30009709,'Pepsi',74,'2015-05-06',3),
(30009515,'Pepsi',44,'2015-05-05',4),
(30009515,'Pepsi',84,'2015-05-04',2),
(30009515,'Pepsi',34,'2015-05-01',2);
-- --------------------------------------------------------

--
-- Table structure for table `po`
--

CREATE TABLE IF NOT EXISTS `po` (
  `id` bigint NOT NULL,
  `fecha` date NOT NULL,
  `subcontractor_Id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subcontractor_Id` (`subcontractor_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

insert into po(id,fecha,subcontractor_Id)values
('4500459632','2015-05-03',1),
('4500459656','2015-05-14',2),
('4500459643','2015-05-06',1);
-- --------------------------------------------------------



--
-- Table structure for table `material`
--

CREATE TABLE IF NOT EXISTS `material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(30) NOT NULL,
  `description` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `qty` int(11) NOT NULL,
  `model_Id` int(11) NOT NULL,
  `po_Id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `model_Id` (`model_Id`),
  KEY `po_Id` (`po_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

insert into material(number,description,qty,model_Id,po_Id)values
('VT4100NSW-001-9417','REAR FRAME',84,1,4500459632),
('VT4100NSW-001-9417','REAR FRAME',44,2,4500456956),
('VT4100NSW-001-9417','REAR FRAME',24,3,4500459643),
('VT4100NSW-001-9417','REAR FRAME',54,4,4500459632),
('VT4100NSW-001-9417','REAR FRAME',64,5,4500459643);


-- --------------------------------------------------------

--
-- Table structure for table `produced`
--

CREATE TABLE IF NOT EXISTS `produced` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `qty` int(11) NOT NULL,
  `p_date` date NOT NULL,
  `model_Id` int(11) NOT NULL,
  `material_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `model_Id` (`model_Id`),
  KEY `material_Id` (`material_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

insert into produced(qty,p_date,model_Id,material_Id)values
(50,'2015-05-09',1,1),
(50,'2015-05-10',2,2),
(50,'2015-05-14',3,3);

SELECT SUM(CASE WHEN model_id = 1 AND p_date = "2015-05-09" THEN qty else 0 END) AS daily, SUM(CASE WHEN model_id = 1 THEN qty ELSE 0 END) AS total
FROM produced;
-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE IF NOT EXISTS `schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `model_Id` int(11) NOT NULL,
  `line_Id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `model_Id` (`model_Id`),
  KEY `line_Id` (`line_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

INSERT INTO schedule (date,sdate,lot,model_Id,line_Id)values
('2015-05',1,1),
('2015-05',3,2),
('2015-05',4,3),
('2015-05',5,4),
('2015-05',6,1);

-- --------------------------------------------------------

--
-- Table structure for table `subassy`
--

CREATE TABLE IF NOT EXISTS `subassy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

insert into subassy(description)values
('REAR FRAME'),
('REAR BUMPER'),
('LANDING GEAR'),
('LARGE SLIDER'),
('SMALL SLIDER'),
('X-MEM FWD'),
('X-MEM DROP'),
('FRONT POST');
-- --------------------------------------------------------

--
-- Table structure for table `subcontractor`
--

CREATE TABLE IF NOT EXISTS `subcontractor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Dumping data for table `subcontractor`
--

INSERT INTO `subcontractor` (`id`, `nombre`) VALUES
(1, 'ATA'),
(2, 'YIENT');

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE IF NOT EXISTS `type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`id`, `description`) VALUES
(1, 'general'),	-- Solo Dashboard - Daily Report
(2, 'AdminSub'), -- Purchase order - Production - Deliveries - Profile
(3, 'AdminOut'), -- A todo menos Users
(4, 'AdminGen'); -- A todo

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `type_Id` int(11) NOT NULL,
  `subcontractor_Id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `type_Id` (`type_Id`),
  KEY `subcontractor_Id` (`subcontractor_Id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `lastname`, `type_Id`, `subcontractor_Id`) VALUES
(1, 'fa@hotmail.com', '5ab267ec73b81c681f29d24eed362487275319d8', 'fausto', 'serrano', 4, 0),
(2, 'juans@translead.com', 'ee06bf8bfebe408f1954466bb64ba4d6497629d3', 'Juan', 'Salgado', 1, 0),
(3, 'kris@translead.com', 'eebb288ea1a9761364670c66010e9e2f83af807a', 'Kris', 'Medina', 2, 2),
(4, 'erik@translead.com', 'ac0569d63af85a1884f6726c636edadcc8f2290b', 'Eric', 'Arellano', 3, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
