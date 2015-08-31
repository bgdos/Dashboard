create database IF NOT EXISTS dashboard;
use dashboard;


-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 20-08-2015 a las 17:23:49
-- Versión del servidor: 10.0.20-MariaDB
-- Versión de PHP: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "-08:00";




--
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `delivery`
--

CREATE TABLE IF NOT EXISTS `delivery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `qty` int(11) NOT NULL,
  `d_date` date NOT NULL,
  `model_Id` int(11) NOT NULL,
  `material_Id` int(11) NOT NULL,
  `packing` text COLLATE utf8_unicode_ci NOT NULL,
  `statusId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `model_Id` (`model_Id`),
  KEY `material_Id` (`material_Id`),
  KEY `statusId` (`statusId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Disparadores `delivery`
--
DROP TRIGGER IF EXISTS `confirm_and_close_po`;
DELIMITER //
CREATE TRIGGER `confirm_and_close_po` AFTER UPDATE ON `delivery`
 FOR EACH ROW BEGIN
	set @p  = (SELECT sum(qty) FROM material WHERE po_Id = (select po_Id from material where id = old.material_id));
    set @d  = (SELECT sum(delivery.qty) FROM delivery 
				JOIN material on delivery.material_Id = material.id
				WHERE material.po_Id = (select po_Id from material where id = old.material_id));                                               
		IF @p = @d THEN
			update po set status_Id = 2 where id = (select po_Id from material where id = old.material_id);
		END IF;
	END
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `discrepancy`
--

CREATE TABLE IF NOT EXISTS `discrepancy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `delivery_Id` int(11) NOT NULL,
  `subcontractor_Id` int(11) NOT NULL,
  `actual_qty` int(11) NOT NULL,
  `packing_qty` int(11) NOT NULL,
  `discrepancy_qty` int(11) NOT NULL,
  `discrepancy_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `line`
--

CREATE TABLE IF NOT EXISTS `line` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `line`
--

INSERT INTO `line` (`id`, `description`) VALUES
(1, 'A'),
(2, 'B'),
(3, 'C'),
(4, 'H');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `material`
--

CREATE TABLE IF NOT EXISTS `material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `qty` int(11) NOT NULL,
  `model_Id` int(11) NOT NULL,
  `po_Id` bigint(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `model_Id` (`model_Id`),
  KEY `po_Id` (`po_Id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `material`
--

INSERT INTO `material` (`id`, `number`, `description`, `qty`, `model_Id`, `po_Id`) VALUES
(1, 'VT4100NSW-001-8587', 'REAR FRAME', 145, 22, 4500433253);

--
-- Disparadores `material`
--
DROP TRIGGER IF EXISTS `deletepo`;
DELIMITER //
CREATE TRIGGER `deletepo` AFTER DELETE ON `material`
 FOR EACH ROW BEGIN
		if (select COUNT(po_Id) from material where po_Id = old.po_id) = 0 THEN
			update po set status_Id = 3 where id = old.po_Id;
		END IF;
	END
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model`
--

CREATE TABLE IF NOT EXISTS `model` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` int(11) NOT NULL,
  `owner` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `lot` int(11) NOT NULL,
  `sdate` date NOT NULL,
  `line_Id` int(11) NOT NULL,
  `status_Id` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `line_Id` (`line_Id`),
  KEY `status_Id` (`status_Id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=36 ;

--
-- Volcado de datos para la tabla `model`
--

INSERT INTO `model` (`id`, `number`, `owner`, `lot`, `sdate`, `line_Id`, `status_Id`) VALUES
(1, 30009610, 'CARDINAL L. / N', 1, '2015-08-18', 1, '2'),
(2, 30009609, 'CARDINAL L. / N', 1, '2015-08-18', 1, '2'),
(3, 30009564, 'CARDINAL L. / N', 1, '2015-08-18', 1, '2'),
(4, 30009565, 'CARDINAL L. / N', 10, '2015-08-18', 1, '2'),
(5, 30009611, 'CARDINAL L. / N', 2, '2015-08-18', 1, '2'),
(6, 30009515, 'CRST / EXPEDITE', 230, '2015-08-18', 1, '2'),
(7, 30010149, 'NAT / BIMBO BAK', 14, '2015-08-17', 2, '2'),
(8, 30009890, 'W&B SERVICE / S', 80, '2015-08-17', 2, '2'),
(9, 30009498, 'COAST TRUCK CEN', 4, '2015-08-20', 2, '2'),
(10, 30009499, 'COAST TRUCK CEN', 2, '2015-08-21', 2, '1'),
(11, 30009884, 'WERNER ENTERP. ', 14, '2015-08-18', 3, '2'),
(12, 30009786, 'W&B SERVICE / B', 49, '2015-08-18', 3, '2'),
(13, 30009676, 'TRAILER EQUIP. ', 20, '2015-08-20', 3, '2'),
(14, 30009455, 'ISTATE / STOCK', 15, '2015-08-20', 3, '2'),
(15, 30009920, 'ISTATE / STOCK', 5, '2015-08-20', 3, '2'),
(16, 30009391, 'INTERSTATE DIST', 25, '2015-08-20', 3, '2'),
(17, 30009958, 'CONTRACT LEASIN', 49, '2015-08-21', 3, '1'),
(18, 30009873, 'CONTRACT LEASIN', 1, '2015-08-22', 3, '1'),
(19, 30009214, 'NORTH AMERICA T', 20, '2015-08-22', 3, '1'),
(20, 30009215, 'NORTH AMERICA T', 40, '2015-08-24', 3, '1'),
(21, 30009766, 'FEDEX GROUND', 250, '2015-08-17', 4, '2'),
(22, 30008587, 'SWIFT LEASING', 185, '2015-08-22', 4, '1'),
(23, 30009990, 'SWIFT LEASING', 100, '2015-08-26', 4, '1'),
(24, 30009987, 'CHICAGO BRANCH ', 140, '2015-08-27', 4, '1'),
(25, 30009235, 'KNIGHT TRANSPOR', 50, '2015-08-29', 4, '1'),
(26, 30009825, 'SCHNEIDER NATIO', 80, '2015-08-31', 4, '1'),
(27, 30009608, 'CARDINAL L. / N', 20, '2015-08-25', 3, '1'),
(28, 30009566, 'CARDINAL L. / N', 28, '2015-08-25', 3, '1'),
(29, 30009607, 'CARDINAL L. / N', 2, '2015-08-26', 3, '1'),
(30, 30009971, 'ISTATE / STOCK', 10, '2015-08-26', 3, '1'),
(31, 30009758, 'JOHNSEN / MIDWE', 30, '2015-08-26', 3, '1'),
(32, 30009814, 'TRAILER EQUIP. ', 50, '2015-08-27', 3, '1'),
(33, 30010022, 'SCHNEIDER NATIO', 200, '2015-09-02', 4, '1'),
(34, 30009551, 'XTRA LEASE ', 225, '2015-09-05', 4, '1'),
(35, 30009386, 'DART TRANSIT', 100, '2015-09-09', 4, '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `po`
--

CREATE TABLE IF NOT EXISTS `po` (
  `id` bigint(20) NOT NULL,
  `date` date NOT NULL,
  `subcontractor_Id` int(11) NOT NULL,
  `status_Id` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subcontractor_Id` (`subcontractor_Id`),
  KEY `status_Id` (`status_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `po`
--

INSERT INTO `po` (`id`, `date`, `subcontractor_Id`, `status_Id`) VALUES
(4500433253, '2015-08-20', 2, '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `produced`
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `schedule`
--

CREATE TABLE IF NOT EXISTS `schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `model_Id` int(11) NOT NULL,
  `line_Id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `model_Id` (`model_Id`),
  KEY `line_Id` (`line_Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status`
--

CREATE TABLE IF NOT EXISTS `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `status`
--

INSERT INTO `status` (`id`, `description`) VALUES
(1, 'open'),
(2, 'closed'),
(3, 'deleted');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subassy`
--

CREATE TABLE IF NOT EXISTS `subassy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=15 ;

--
-- Volcado de datos para la tabla `subassy`
--

INSERT INTO `subassy` (`id`, `description`) VALUES
(1, 'REAR FRAME'),
(2, 'REAR BUMPER'),
(3, 'LANDING GEAR'),
(4, 'LARGE SLIDER'),
(5, 'SMALL SLIDER'),
(6, 'X-MEM FWD'),
(7, 'X-MEM DROP'),
(8, 'FRONT POST'),
(9, 'PINTLE HOOK'),
(10, 'X-MEMBER ASSY'),
(11, 'TRANSITION ASSY'),
(12, 'TIRE BOX'),
(13, 'ROLLER CONVEYOR'),
(14, 'BASE ASSY');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subcontractor`
--

CREATE TABLE IF NOT EXISTS `subcontractor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=26 ;

--
-- Volcado de datos para la tabla `subcontractor`
--

INSERT INTO `subcontractor` (`id`, `nombre`) VALUES
(1, 'AMEX'),
(2, 'ATA'),
(3, 'CLAVE'),
(4, 'FETASA'),
(5, 'GLUZ'),
(6, 'HJE'),
(7, 'INMERGALV'),
(8, 'INMERMERK'),
(9, 'JEMPLASTIC'),
(10, 'NFL'),
(11, 'PROFES'),
(12, 'SANWON'),
(13, 'SMART FINISH'),
(14, 'YIENT');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type`
--

CREATE TABLE IF NOT EXISTS `type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `type`
--

INSERT INTO `type` (`id`, `description`) VALUES
(1, 'AdminGen'),
(2, 'AdminOut'),
(3, 'AdminSub'),
(4, 'General');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
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
  UNIQUE KEY `email` (`email`),
  KEY `type_Id` (`type_Id`),
  KEY `subcontractor_Id` (`subcontractor_Id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=21 ;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `lastname`, `type_Id`, `subcontractor_Id`) VALUES
(1, 'faustos@translead.com', '5ab267ec73b81c681f29d24eed362487275319d8', 'Fausto', 'Serrano', 1, 1),
(2, 'juans@translead.com', '1f59156108279824ad3ffe983173ccd7e96573ea', 'Juan', 'Salgado', 1, 0),
(14, 'seilk@translead.com', '14f8342a70908e1aa7043149f1629e9d93572207', 'Seil', 'Kim', 2, 0),
(15, 'gonzalor@translead.com', 'ade3a1dbbe64092c502a203e4a5d6694e71560d4', 'Gonzalo', 'Rivera', 2, 0),
(19, 'rafaelm@gsmexicana.com', '0d03c545faa2e97560769d1d3c225d2e50893cbd', 'Rafael', 'Murillo', 3, 2),
(20, 'joelp@translead.com', 'dca369581b218c5d57a3618af3890bf6fadc5e49', 'Joel', 'Padilla', 2, 0);
