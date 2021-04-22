-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le :  jeu. 22 avr. 2021 à 16:54
-- Version du serveur :  5.7.26
-- Version de PHP :  7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `Comments`
--

CREATE TABLE `Comments` (
  `id` int(11) NOT NULL,
  `content` text,
  `author` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PostId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Comments`
--

INSERT INTO `Comments` (`id`, `content`, `author`, `createdAt`, `updatedAt`, `PostId`, `UserId`) VALUES
(1, 'Je valide !!', 'SpiderMan', '2021-04-22 16:36:34', '2021-04-22 16:36:34', 1, 3),
(2, 'L\'octogone c\'est quand tu veux ou tu veux on verra bien !\n', 'HulkOficial', '2021-04-22 16:40:30', '2021-04-22 16:40:30', 2, 4),
(3, 'Très bonne blague ', 'HulkOficial', '2021-04-22 16:41:11', '2021-04-22 16:41:11', 1, 4),
(4, 'Tu t\'es mis au vert a ce que je vois ;) ', 'ThorEZ', '2021-04-22 16:46:00', '2021-04-22 16:46:00', 3, 5),
(5, 'j\'vous prend 1v2 ', 'ThorEZ', '2021-04-22 16:46:28', '2021-04-22 16:46:28', 2, 5),
(6, 'j\'espere que l\'apprenti depassera son maitre ', 'ThorEZ', '2021-04-22 16:46:57', '2021-04-22 16:46:57', 1, 5),
(7, 'toujours aussin fin ', 'SpiderMan', '2021-04-22 16:48:26', '2021-04-22 16:48:26', 3, 3),
(8, 'lol \n', 'SpiderMan', '2021-04-22 16:48:30', '2021-04-22 16:48:30', 2, 3),
(9, 'impossible ', 'SpiderMan', '2021-04-22 16:51:37', '2021-04-22 16:51:37', 1, 3);

-- --------------------------------------------------------

--
-- Structure de la table `Posts`
--

CREATE TABLE `Posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `image` varchar(255) DEFAULT NULL,
  `author` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Posts`
--

INSERT INTO `Posts` (`id`, `title`, `content`, `image`, `author`, `createdAt`, `updatedAt`, `UserId`) VALUES
(1, 'Spider man c\'est vraiment le best ', 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium.', 'http://localhost:3000/images/Spider-Man-Into-the-Spider-Verse-blu-ray-gq.jpeg1619109383112.jpg', 'SpiderMan', '2021-04-22 16:36:23', '2021-04-22 16:36:23', 3),
(2, 'Hulk c\'est un peu surcoté ', 'Il est pas si fort que ca en fait je crois ', 'http://localhost:3000/images/bRDykziDQhiq9q8vFp3W_fat-hulk-thumb.0.1534619740.jpg1619109480709.jpg', 'SpiderMan', '2021-04-22 16:38:00', '2021-04-22 16:38:00', 3),
(3, 'J\'suis aller a la plage ce weekend regardez cette plage magnifique ', 'c\'etait vraiment bien l\'espagne !!!', 'http://localhost:3000/images/fb78b3a22b725cebc0922c6f592846a8.jpeg1619109850950.jpg', 'HulkOficial', '2021-04-22 16:43:16', '2021-04-22 16:44:10', 4);

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`id`, `email`, `password`, `username`, `role`, `createdAt`, `updatedAt`) VALUES
(2, 'admin@email.com', '$2b$10$C/jA2Wv4qXZIFFgoOQp3s.Mvp1w.bJahBX5sbfaVlCcyIbVE5GkLW', 'superAdmin', 'admin', '2021-04-22 00:00:00', '2021-04-22 00:00:00'),
(3, 'araignee@gmail.com', '$2b$10$wfFsBfq7Z8G3TVQJYybfBeR9QTtpchwqbt1zviaUnnkSq.eAmQhvK', 'SpiderMan', 'basic', '2021-04-22 16:32:37', '2021-04-22 16:32:37'),
(4, 'hulk@gmail.com', '$2b$10$1kQcubI/8Vzw9xeJkz84/.KyQcVOI.PLcIBdy5.K7noNVh2d1OYWG', 'HulkOficial', 'basic', '2021-04-22 16:40:05', '2021-04-22 16:40:05'),
(5, 'thor@gmail.com', '$2b$10$/khGPfuXwLoinn6g3HN7ZeF1HtdzbQ8HjL7Z.75zbay7On9RG/BR.', 'ThorEZ', 'basic', '2021-04-22 16:45:35', '2021-04-22 16:45:35');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PostId` (`PostId`),
  ADD KEY `UserId` (`UserId`);

--
-- Index pour la table `Posts`
--
ALTER TABLE `Posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `Posts`
--
ALTER TABLE `Posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Comments`
--
ALTER TABLE `Comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`PostId`) REFERENCES `Posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Posts`
--
ALTER TABLE `Posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
