-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2025 at 05:14 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `varsity_transport`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `user_type` enum('admin','student-teacher','bus-driver') NOT NULL,
  `status` enum('approved','pending') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `user_type`, `status`, `created_at`) VALUES(1, 'admin1', 'admin1', 'admin', 'approved', '2025-04-14 23:09:26');
INSERT INTO `users` (`id`, `username`, `password`, `user_type`, `status`, `created_at`) VALUES(2, 'driver1', 'drive1', 'bus-driver', 'approved', '2025-04-14 23:09:26');
INSERT INTO `users` (`id`, `username`, `password`, `user_type`, `status`, `created_at`) VALUES(3, 'student1', 'student1', 'student-teacher', 'approved', '2025-04-14 23:09:26');
INSERT INTO `users` (`id`, `username`, `password`, `user_type`, `status`, `created_at`) VALUES(4, 'student2', 'student2', 'student-teacher', 'pending', '2025-04-14 23:09:26');
INSERT INTO `users` (`id`, `username`, `password`, `user_type`, `status`, `created_at`) VALUES(5, 'teacher1', 'teacher1', 'student-teacher', 'pending', '2025-04-14 23:09:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
