CREATE TABLE `levelhistory` (
  `id` int(100) NOT NULL,
  `foruser` int(100) NOT NULL,
  `levelcode` varchar(255) NOT NULL,
  `leveltitle` varchar(255) NOT NULL,
  `levelcreator` varchar(255) NOT NULL,
  `requestedby` varchar(255) DEFAULT NULL,
  `comment` longtext,
  `requestedTime` int(100) NOT NULL,
  `completedTime` int(100) DEFAULT NULL,
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
  `requestedTime` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `id` int(100) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `security_key` varchar(255) DEFAULT NULL,
  `queueOpen` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;