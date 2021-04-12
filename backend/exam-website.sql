-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 12, 2021 at 06:29 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `exam-website`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `email` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  `role` varchar(10) DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`email`, `password`, `role`) VALUES
('head@gmail.com', 'head', 'head'),
('mayank@gmail.com', 'mayank', 'admin'),
('prateek@gmail.com', 'prateek', 'admin'),
('prince@gmail.com', 'prince', 'admin'),
('t@gmail.com', 't1', 'admin'),
('teacher1@gmail.com', 'teacher1', 'admin'),
('teacher2@gmail.com', 'teacher2', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `year` varchar(4) NOT NULL,
  `time_limit` int(11) NOT NULL,
  `open` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`id`, `title`, `year`, `time_limit`, `open`) VALUES
(1, 'Introduction to programming (COSC 101)', '2017', 120, 1);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` text NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `subject` varchar(500) NOT NULL,
  `feedback` varchar(500) NOT NULL,
  `date` date NOT NULL,
  `time` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `exam_id` text NOT NULL,
  `correct` int(11) NOT NULL,
  `wrong` int(11) NOT NULL,
  `grade` char(11) NOT NULL,
  `ddd` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `option` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `question_id`, `option`) VALUES
(1, 1, 'Fuck it'),
(2, 1, 'Don\'t'),
(3, 3, 'I dey'),
(4, 3, 'I no too dey like that');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `question` text NOT NULL,
  `option_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `exam_id`, `question`, `option_id`) VALUES
(1, 1, 'How to love?', 1),
(3, 1, 'How far?', 3),
(4, 1, 'Waddup?', 4);

-- --------------------------------------------------------

--
-- Table structure for table `rank`
--

CREATE TABLE `rank` (
  `email` varchar(50) NOT NULL,
  `score` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rank`
--

INSERT INTO `rank` (`email`, `score`, `time`) VALUES
('a@gmail.com', 6, '2020-11-20 10:35:00'),
('mayank@gmail.com', 10, '2020-11-20 10:18:13'),
('son1@gmail.com', 2, '2020-11-19 17:31:39');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('student','teacher','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `mobile`, `email`, `password`, `role`) VALUES
(33, 'Administrator', '09061279158', 'admin@gmail.com', 'password', 'admin'),
(34, 'Boluwarin Oladipo', '090', 'boluwarino@gmail.com', '$2a$10$sOpniqPOTPkJcCvSDEL2yuXx.EoOv3eXWxBJpiY5atDaBunoLQwCW', 'teacher'),
(35, 'Praise Oluwarinu', '09061279152', 'poluwarinu@gmail.com', '$2a$10$s8noeU/fdtszfcipiizgx.po9QacrzXfXwPZcJInny.yVw3l4X8zS', 'teacher'),
(36, 'Praise the lord', '09061279153', 'praise@gmail.com', '$2a$10$oCCvWpCYHw2xp.46KatgcejFevbkGGe4bNJZMIS8brgsqQOnOTshu', 'teacher'),
(37, 'Ola', '09061279150', 'ola@gmail.com', '$2a$10$LXzfwSs.oSj2zFYBeaXDte5OR0CMFw.2ogjxsUP6GEOPhp4WTbWae', 'teacher'),
(38, 'David of the OBS', '09061279159', 'dobs@gmail.com', '$2a$10$wP4ZHSq8p.XfpC2krKfdt.imCWa20OgdZXHL9fmOM/mv/GVIToL/S', 'teacher'),
(39, 'Ayobami Oladosu', '09061279152', 'ayobami.oladosu@yahoo.com', '$2a$10$kumW/gH3lq92y8.DjkIlq.PlzNvCZXKeCEdtFEQhVy.rBsLdR88RG', 'teacher'),
(40, 'Bayo Orekoya', '09061279156', 'student@gmail.com', '$2a$10$PxtXWKlj2d2BeM.k68Uw.Oqqh8q2i75kFI7IgCQbzjEC5eQkNqh6G', 'student');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD UNIQUE KEY `eid` (`id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exams`
--
ALTER TABLE `exams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
