SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `levelhistory` (
  `id` int(100) NOT NULL,
  `foruser` int(100) NOT NULL,
  `levelcode` varchar(255) NOT NULL,
  `leveltitle` varchar(255) NOT NULL,
  `levelcreator` varchar(255) NOT NULL,
  `requestedby` varchar(255) DEFAULT NULL,
  `comment` longtext,
  `requestedTime` datetime NOT NULL,
  `completedTime` datetime DEFAULT NULL,
  `highscoreTime` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `levelqueue` (
  `id` int(100) NOT NULL,
  `foruser` int(100) NOT NULL,
  `levelcode` varchar(255) NOT NULL,
  `leveltitle` varchar(255) NOT NULL,
  `levelcreator` varchar(255) NOT NULL,
  `requestedby` varchar(255) DEFAULT NULL,
  `comment` longtext,
  `requestedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `id` int(100) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `security_key` varchar(255) DEFAULT NULL,
  `queueOpen` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `username`, `password`, `email`, `security_key`, `queueOpen`) VALUES
(1, 'admin', 'admin1234', 'admin@admin.de', 'Yn8B1gK5eAnG5C4lqcn_1', 0);


ALTER TABLE `levelhistory`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `levelqueue`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `levelhistory`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;

ALTER TABLE `levelqueue`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
