-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2016 at 06:40 AM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 5.5.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project1`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id_user` int(11) NOT NULL,
  `nama_depan` varchar(200) NOT NULL,
  `nama_belakang` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `mod_date` date NOT NULL,
  `flag_active` int(11) NOT NULL,
  `Alamat` varchar(500) NOT NULL,
  `NoTlp` varchar(100) NOT NULL,
  `sex` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id_user`, `nama_depan`, `nama_belakang`, `email`, `password`, `mod_date`, `flag_active`, `Alamat`, `NoTlp`, `sex`) VALUES
(1, 'adi', 'putra', 'adiputra_fong@yahoo.com', 'adiputra89', '0000-00-00', 0, '', '', ''),
(2, 'adi', 'adi', 'adi@gmail.com', '1234', '0000-00-00', 0, 'Jl Mahkota', '33333', 'pria'),
(3, 'xxx', 'xxx', 'xxx@gmail.cm', 'sss', '0000-00-00', 0, 'JL Oktober', '084921222222', 'pria'),
(10, 'budi', 'susanto', 'budi@gmail.com', 'budi', '0000-00-00', 0, 'Jl ssusanto', '08592321111', 'pria'),
(11, 'agnes', 'monic', 'agnes@gmail.com', 'agnes1234', '0000-00-00', 0, 'Jl Pondok indah', '085923821112', 'wanita');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
